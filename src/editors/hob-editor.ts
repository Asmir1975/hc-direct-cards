import { BaseApplianceEditor } from "./base-editor";
import { hobDefinition } from "../definitions";
import { registerElement } from "../helpers/register";
export class HobCardEditor extends BaseApplianceEditor { protected definition = hobDefinition; }
registerElement(hobDefinition.editorTag, HobCardEditor);
