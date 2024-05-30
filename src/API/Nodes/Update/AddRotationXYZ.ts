import { ConnectableVector3Field } from "API/Fields/ConnectableVector3Field";
import { NodeGroups } from "API/NodeGroup";
import type { ParticleData } from "API/ParticleService";
import type { Src } from "API/VFXScriptCreator";
import { AutoGenUpdateNode, UpdateNode } from "./UpdateNode";

export const AddRotationXYZName = "AddRotationXYZ";
export const AddRotationXYZFieldNames = {
    rotation: "rotation",
};

export class AddRotationXYZ extends UpdateNode {
    nodeGroup: NodeGroups = NodeGroups.Update;
    nodeFields = {
        rotation: new ConnectableVector3Field(0, 0, 0),
    };

    Update(data: ParticleData, dt: number) {
        const addition = this.nodeFields.rotation.GetVector3(data);
        const rotation = data.rotation;

        const x = rotation.X + addition.x * dt;
        const y = rotation.Y + addition.y * dt;
        const z = rotation.Z + addition.z * dt;

        data.rotation = new Vector3(x, y, z);
    }

    GetNodeName(): string {
        return AddRotationXYZName;
    }

    GetAutoGenerationCode(src: Src) {
        AutoGenUpdateNode(this, src, (varName) => {
            this.nodeFields.rotation.AutoGenerateField(`${varName}.nodeFields.rotation`, src);
        });
    }
}
