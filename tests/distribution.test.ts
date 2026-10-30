import { describe,it,expect } from "vitest";
import { readFileSync } from "node:fs";
const root=new URL("../",import.meta.url);
const bundle=readFileSync(new URL("dist/home-connect-direct-cards.js",root),"utf8");
describe("standalone distribution",()=>{
 it("retains the complete project and bundled dependency licenses",()=>{
  for(const file of ["LICENSE","licenses/LIT_BSD_3_CLAUSE.txt"])expect(bundle).toContain(readFileSync(new URL(file,root),"utf8").trim());
 });
 it("contains the five supported types only",()=>{
  for(const kind of ["coffee","dishwasher","hob","hood","oven"])expect(bundle).toContain("hc-direct-"+kind+"-card");
  expect(bundle).not.toContain("hc-direct-"+"dryer-card");
 });
});
