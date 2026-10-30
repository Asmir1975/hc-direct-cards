import { describe, it, expect, vi } from "vitest";
import fixture from "./fixtures/own-devices-1130.json";
import { discoverEntities } from "../../src/helpers/registry";
import { hoodDefinition, hobDefinition, coffeeDefinition, ovenDefinition, dishwasherDefinition } from "../../src/definitions";
import { isControlAvailable, showQuantityField } from "../../src/helpers/controls";
import { setBrightness, setFanSpeed, selectOption } from "../../src/helpers/services";
import { displayState, isWarningActive } from "../../src/helpers/formatting";
import { zoneIsHot, zoneIsActive } from "../../src/helpers/hob";
import type { HomeAssistant, HassEntity } from "../../src/types/home-assistant";

const definitions = { hood:hoodDefinition, hob:hobDefinition, coffee:coffeeDefinition, oven:ovenDefinition, dishwasher:dishwasherDefinition };
function ownHass(kind: keyof typeof fixture.models) {
  const device=fixture.models[kind];
  return { states:structuredClone(device.states), language:"de", callWS:vi.fn(async()=>structuredClone(device.registry)), callService:vi.fn(async()=>undefined) } as unknown as HomeAssistant;
}
const entity=(entity_id:string,state:string,attributes={}):HassEntity=>({entity_id,state,attributes,last_changed:"",last_updated:""});

describe("Saved device profiles and DEV entity snapshots",()=>{
  it.each(Object.keys(definitions) as Array<keyof typeof definitions>)("discovers only existing %s entities",async(kind)=>{
    const hass=ownHass(kind),def=definitions[kind],device=fixture.models[kind];
    const result=await discoverEntities(hass,device.registry[0].entity_id,def,{type:def.cardType});
    expect(device.unmatched).toEqual([]);
    for(const id of Object.values(result)) expect(hass.states[id as string]).toBeDefined();
    expect(Object.keys(result).length).toBeGreaterThan(kind==="hob"?20:8);
    expect(result.operating_state_entity).toBe("sensor.siemens_"+(kind==="coffee"?"coffeemaker":kind)+"_betriebszustand");
  });

  it("finds the new dishwasher options, hood power switch and oven cavity light",async()=>{
    const dish=ownHass("dishwasher");
    const d=await discoverEntities(dish,fixture.models.dishwasher.registry[0].entity_id,dishwasherDefinition,{type:dishwasherDefinition.cardType});
    expect(d.smart_start_entity).toBe("switch.siemens_dishwasher_smart_start");
    expect(d.auto_smart_start_entity).toBe("switch.siemens_dishwasher_automatischer_smart_start");
    expect(d.phase_entity).toBe("sensor.siemens_dishwasher_programmphase");
    expect(d.extra_dry_entity).toBe("switch.siemens_dishwasher_extratrocknen");
    expect(d.intensive_zone_entity).toBe("switch.siemens_dishwasher_intensivzone");
    expect(d.speed_on_demand_entity).toBe("switch.siemens_dishwasher_schnell_auf_knopfdruck");
    const hood=ownHass("hood");
    const h=await discoverEntities(hood,fixture.models.hood.registry[0].entity_id,hoodDefinition,{type:hoodDefinition.cardType});
    expect(h.power_entity).toBe("switch.siemens_hood_einschalter");
    const oven=ownHass("oven");
    const o=await discoverEntities(oven,fixture.models.oven.registry[0].entity_id,ovenDefinition,{type:ovenDefinition.cardType});
    expect(o.cavity_light_entity).toBe("light.siemens_oven_garraumlicht");
  });

  it("detects LC91KLT60's real level select, dimmable light and filters",async()=>{
    const hass=ownHass("hood");
    const result=await discoverEntities(hass,fixture.models.hood.registry[0].entity_id,hoodDefinition,{type:hoodDefinition.cardType});
    expect(result.fan_entity).toBe("fan.siemens_hood_lufter");
    expect(result.hood_level_entity).toBe("select.siemens_hood_haubenstufe");
    expect(result.working_light_entity).toBe("light.siemens_hood_arbeitslicht");
    expect(result.messages_entity).toBeDefined();
    expect(fixture.models.hood.info.model).toBe("LC91KLT60");
  });

  it("detects EX851LYV5E's four actual zones without adding power controls",async()=>{
    const hass=ownHass("hob");
    const result=await discoverEntities(hass,fixture.models.hob.registry[0].entity_id,hobDefinition,{type:hobDefinition.cardType});
    for(const zone of ["100","200","300","400"]) expect(result["zone_"+zone+"_power_entity"]).toBe("sensor.siemens_hob_zone_"+zone+"_leistungsstufe");
    expect(hobDefinition.fields.filter(f=>f.key.startsWith("zone_")).every(f=>f.kind==="status")).toBe(true);
    expect(hobDefinition.fields.some(f=>["start_entity","selected_program_entity","power_entity"].includes(f.key))).toBe(false);
    expect(fixture.models.hob.info.model).toBe("EX851LYV5E");
  });

  it("rejects a restored entity using the real hob entity ID",async()=>{
    const hass=ownHass("hob");
    const current=await discoverEntities(hass,fixture.models.hob.registry[0].entity_id,hobDefinition,{type:hobDefinition.cardType});
    expect(current.child_lock_entity).toBeDefined();
    hass.states[current.child_lock_entity as string].attributes.restored=true;
    const result=await discoverEntities(hass,fixture.models.hob.registry[0].entity_id,hobDefinition,{type:hobDefinition.cardType});
    expect(result.child_lock_entity).toBeUndefined();
    for(const id of Object.values(result)) expect(hass.states[id as string].attributes.restored).not.toBe(true);
  });

  it("sends the exact real hood stage value",async()=>{
    const hass=ownHass("hood");
    const e=hass.states["select.siemens_hood_haubenstufe"];
    const option=e.attributes.options![2];
    await selectOption(hass,e,option);
    expect(hass.callService).toHaveBeenCalledWith("select","select_option",{entity_id:e.entity_id,option});
  });

  it("uses HA brightness percentages instead of passing 0..255 numbers",async()=>{
    const hass=ownHass("hood"),light=hass.states["light.siemens_hood_arbeitslicht"];
    await setBrightness(hass,light,24);
    expect(hass.callService).toHaveBeenCalledWith("light","turn_on",{entity_id:light.entity_id,brightness_pct:24});
    await setBrightness(hass,light,0);
    expect(hass.callService).toHaveBeenLastCalledWith("light","turn_off",{entity_id:light.entity_id});
  });

  it("uses native fan percentage fallback",async()=>{
    const hass=ownHass("hood"),fan=hass.states["fan.siemens_hood_lufter"];
    await setFanSpeed(hass,fan,40);
    expect(hass.callService).toHaveBeenCalledWith("fan","set_percentage",{entity_id:fan.entity_id,percentage:40});
  });

  it("preserves residual heat even after operation becomes inactive",()=>{
    expect(zoneIsHot(entity("sensor.zone","residuelheat"))).toBe(true);
    expect(zoneIsActive(entity("sensor.zone","off"),entity("sensor.operation","inactive"))).toBe(false);
    expect(zoneIsActive(entity("sensor.zone","active"),entity("sensor.operation","run"))).toBe(true);
    expect(zoneIsHot(entity("sensor.zone","unknown"))).toBe(false);
  });

  it("does not flag positive machine-care countdowns as faults",()=>{
    expect(isWarningActive(entity("sensor.care","18"),undefined,0)).toBe(false);
    expect(isWarningActive(entity("sensor.care","0"),undefined,0)).toBe(true);
    expect(isWarningActive(entity("sensor.care","18.0"),undefined,0)).toBe(false);
  });

  it("retains a valid HA translation that only changes capitalization",()=>{
    const hass=ownHass("coffee");hass.formatEntityState=()=>"Normal";
    expect(displayState(hass,entity("select.beans","normal"))).toBe("Normal");
  });

  it("lets a valid quantity select be set after its old value becomes unknown",async()=>{
    const hass=ownHass("coffee");
    const e=entity("select.quantity","unknown",{options:["35 ml","40 ml","45 ml"],readonly:false});
    hass.states[e.entity_id]=e;
    expect(isControlAvailable(e)).toBe(true);
    expect(showQuantityField("fill_quantity_select_entity",hass,{type:"custom:hc-direct-coffee-card",fill_quantity_select_entity:e.entity_id})).toBe(true);
    await selectOption(hass,e,"40 ml");
    expect(hass.callService).toHaveBeenCalledWith("select","select_option",{entity_id:e.entity_id,option:"40 ml"});
  });

  it("rejects an option outside the current beverage options",async()=>{
    const hass=ownHass("coffee");
    await expect(selectOption(hass,entity("select.quantity","unknown",{options:["35 ml","40 ml"]}),"150 ml")).rejects.toThrow();
    expect(hass.callService).not.toHaveBeenCalled();
  });

  it("blocks readonly and unavailable light/fan writes",async()=>{
    const hass=ownHass("hood");
    await expect(setBrightness(hass,entity("light.test","on",{readonly:true}),20)).rejects.toThrow();
    await expect(setFanSpeed(hass,entity("fan.test","unavailable"),20)).rejects.toThrow();
    expect(hass.callService).not.toHaveBeenCalled();
  });
});
