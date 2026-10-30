import { describe,it,expect } from "vitest";
import { HOB_COLUMNS,hobPairMode } from "../../src/helpers/hob";
import type { HassEntity } from "../../src/types/home-assistant";
const state=(value:string)=>({entity_id:"select.mode",state:value,attributes:{}} as HassEntity);
describe("EX851LYV5E physical layout and pair display",()=>{
 it("places back left/right above front left/right",()=>{
  expect(HOB_COLUMNS.map(c=>c.zones[0])).toEqual(["200","300"]);
  expect(HOB_COLUMNS.map(c=>c.zones[1])).toEqual(["100","400"]);
 });
 it("groups the left and right pairs for reported Join",()=>{
  expect(hobPairMode(state("joinmode"),state("cooking_hob_program_powerlevelmode"))).toBe("join");
  expect(hobPairMode(state("splitmode"),state("cooking_hob_program_powerlevelmode"))).toBe("");
 });
 it("groups both sides for reported powerMove independently of bridge setting",()=>{
  expect(hobPairMode(state("splitmode"),state("cooking_hob_program_powermovemode"))).toBe("move");
  expect(hobPairMode(state("joinmode"),state("Cooking.Hob.Program.PowerMoveMode"))).toBe("move");
 });
 it("does not infer grouping from unavailable or unknown modes",()=>{
  expect(hobPairMode(state("unavailable"),state("unknown"))).toBe("");
  expect(hobPairMode(undefined,undefined)).toBe("");
  expect(hobPairMode(state("splitmode"),state("cooking_hob_program_fryingsensormode"))).toBe("");
 });
});
