import { BaseApplianceEditor } from "./base-editor";
import { hoodDefinition } from "../definitions";
import { registerElement } from "../helpers/register";
export class HoodCardEditor extends BaseApplianceEditor { protected definition = hoodDefinition; }
registerElement(hoodDefinition.editorTag, HoodCardEditor);
