import type { ParticleData } from "API/ParticleService";
import type { Src } from "API/VFXScriptCreator";
import { ConnectableNumberField } from "../../Fields/ConnectableNumberField";
import { NodeGroups } from "../../NodeGroup";
import { AutoGenInitializeNode, InitializeNode } from "./InitializeNode";

export const SetTransparencyName = "SetTransparency";
export const SetTransparencyFieldNames = {
    transparency: "transparency",
};

export class SetTransparency extends InitializeNode {
    nodeGroup: NodeGroups = NodeGroups.Initialize;
    nodeFields: {
        transparency: ConnectableNumberField;
    };

    constructor() {
        super();

        this.nodeFields = {
            transparency: new ConnectableNumberField(0),
        };
    }

    Initialize(data: ParticleData) {
        data.transparency = this.nodeFields.transparency.GetNumber(data);
    }

    GetNodeName(): string {
        return SetTransparencyName;
    }

    GetAutoGenerationCode(src: Src) {
        AutoGenInitializeNode(this, src, (varName) => {
            this.nodeFields.transparency.AutoGenerateField(`${varName}.nodeFields.transparency`, src);
        });
    }
}
