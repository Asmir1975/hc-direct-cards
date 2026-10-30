import { describe,it,expect } from "vitest";
import * as definitions from "../src/definitions";
describe("supported card scope",()=>{
 it("exports exactly the five owned appliance cards",()=>{
  expect(Object.values(definitions).map(d=>d.kind).sort()).toEqual(["coffee","dishwasher","hob","hood","oven"]);
  expect(new Set(Object.values(definitions).map(d=>d.cardType)).size).toBe(5);
 });
});
