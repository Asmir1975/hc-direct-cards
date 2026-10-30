import { describe,it,expect,vi } from "vitest";
import fixture from "./fixtures/own-devices-1130.json";
import { discoverEntities,discoveryKey } from "../src/helpers/registry";
import { hobDefinition,hoodDefinition,coffeeDefinition,ovenDefinition,dishwasherDefinition } from "../src/definitions";
import { selectOption } from "../src/helpers/services";
import { serializeCardConfig } from "../src/helpers/export";
import type { HomeAssistant,HassEntity } from "../src/types/home-assistant";
const definitions={hob:hobDefinition,hood:hoodDefinition,coffee:coffeeDefinition,oven:ovenDefinition,dishwasher:dishwasherDefinition};
function allHass() {
 const registry=structuredClone(Object.values(fixture.models).flatMap(m=>m.registry));
 const states=structuredClone(Object.assign({},...Object.values(fixture.models).map(m=>m.states)));
 return {registry,hass:{states,callWS:vi.fn(async()=>registry),callService:vi.fn(async()=>undefined)} as unknown as HomeAssistant};
}
describe("device-only discovery and Hob options",()=>{
 it.each(Object.keys(definitions) as Array<keyof typeof definitions>)("detects %s using only device_id",async kind=>{
  const {hass}=allHass(); const definition=definitions[kind];
  const result=await discoverEntities(hass,"",definition,{type:definition.cardType,device_id:"offline-"+kind});
  expect(result.operating_state_entity).toBe("sensor.siemens_"+(kind==="coffee"?"coffeemaker":kind)+"_betriebszustand");
  expect(Object.keys(result).length).toBeGreaterThan(10);
 });
 it("never falls back to a different anchor's device when the chosen device is absent",async()=>{
  const {hass}=allHass();
  await expect(discoverEntities(hass,"sensor.siemens_hood_betriebszustand",hobDefinition,{type:hobDefinition.cardType,device_id:"missing"})).rejects.toThrow();
 });
 it("follows renamed entity IDs when resolving a device again",async()=>{
  const {hass,registry}=allHass();
  const entry=registry.find(e=>e.unique_id==="offline-sensor_hob_zone_100_power_level")!;
  const before=entry.entity_id;entry.entity_id="sensor.renamed_zone";
  hass.states[entry.entity_id]={...hass.states[before],entity_id:entry.entity_id};delete hass.states[before];
  const result=await discoverEntities(hass,"",hobDefinition,{type:hobDefinition.cardType,device_id:"offline-hob"});
  expect(result.zone_100_power_entity).toBe("sensor.renamed_zone");
 });
 it("preserves explicitly assigned manual roles",async()=>{
  const {hass}=allHass();
  const result=await discoverEntities(hass,"",hobDefinition,{type:hobDefinition.cardType,device_id:"offline-hob",zone_100_power_entity:"sensor.manual"});
  expect(result.zone_100_power_entity).toBeUndefined();
 });
 it("detects all six actual powerMove setting selects",async()=>{
  const {hass}=allHass();
  const result=await discoverEntities(hass,"",hobDefinition,{type:hobDefinition.cardType,device_id:"offline-hob"});
  for(const [pos,de] of [["front","vorne"],["middle","mitte"],["rear","hinten"]]) {
   expect(result["power_move_"+pos+"_left_entity"]).toBe("select.siemens_hob_powermove_stufe_"+de+"_links");
   expect(result["power_move_"+pos+"_right_entity"]).toBe("select.siemens_hob_powermove_stufe_"+de+"_rechts");
  }
  expect(result.hob_mode_entity).toBe("select.siemens_hob_ausgewahltes_programm");
  expect(result.bridge_mode_entity).toBe("select.siemens_hob_varioinduktion");
 });
 it("uses the actual Join entity and excludes it when disabled",async()=>{
  const {hass,registry}=allHass();
  const id="select.siemens_hob_varioinduktion";
  const result=await discoverEntities(hass,"",hobDefinition,{type:hobDefinition.cardType,device_id:"offline-hob"});
  expect(result.bridge_mode_entity).toBe(id);
  await selectOption(hass,hass.states[id],"joinmode");
  expect(hass.callService).toHaveBeenCalledWith("select","select_option",{entity_id:id,option:"joinmode"});
  registry.find(e=>e.entity_id===id)!.disabled_by="user";
  const excluded=await discoverEntities(hass,"",hobDefinition,{type:hobDefinition.cardType,device_id:"offline-hob"});
  expect(excluded.bridge_mode_entity).toBeUndefined();
 });

 it("sends the exact powerMove preset value and respects readonly",async()=>{
  const {hass}=allHass();
  const entity=hass.states["select.siemens_hob_powermove_stufe_vorne_links"];
  await selectOption(hass,entity,"50");
  expect(hass.callService).toHaveBeenCalledWith("select","select_option",{entity_id:entity.entity_id,option:"50"});
  const mode=hass.states["select.siemens_hob_ausgewahltes_programm"];
  await expect(selectOption(hass,mode,"cooking_hob_program_powermovemode")).rejects.toThrow(/read-only/);
 });
 it("exports a minimal device configuration without entity IDs",()=>{
  const config={type:hobDefinition.cardType,device_id:"offline-hob"};
  const yaml=serializeCardConfig(config,hobDefinition);
  expect(yaml).toContain("device_id: offline-hob");
  expect(yaml).not.toContain("_entity:");
  expect(discoveryKey(config)).toBe("device:offline-hob");
 });
});
