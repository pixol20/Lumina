import { ConnectableVector2Field } from "API/Fields/ConnectableVector2Field";
import type { SimpleVector3 } from "API/Fields/Vector3Field";
import { Rand, RoundDecimal } from "API/Lib";
import { NodeGroups } from "API/NodeGroup";
import type { ParticleData } from "API/ParticleService";
import type { Src } from "API/VFXScriptCreator";
import { AutoGenUpdateNode, UpdateNode } from "./UpdateNode";

export const AddRotationXYZRandomName = "AddRotationXYZRandom";
export const AddRotationXYZRandomFieldNames = {
    rangeX: "rangeX",
    rangeY: "rangeY",
    rangeZ: "rangeZ",
};

export class AddRotationXYZRandom extends UpdateNode {
    nodeGroup: NodeGroups = NodeGroups.Update;
    nodeFields = {
        rangeX: new ConnectableVector2Field(0, 0),
        rangeY: new ConnectableVector2Field(0, 0),
        rangeZ: new ConnectableVector2Field(0, 0),
    };

    storedValues = new Map<number, SimpleVector3>();

    Update(data: ParticleData, dt: number) {
        let addition = this.storedValues.get(data.particleId);
        if (addition === undefined) {
            const rangeX = this.nodeFields.rangeX.GetVector2(data);
            const rangeY = this.nodeFields.rangeX.GetVector2(data);
            const rangeZ = this.nodeFields.rangeX.GetVector2(data);

            const x = RoundDecimal(Rand.NextNumber(rangeX.x, rangeY.y) * dt, 0.01);
            const y = RoundDecimal(Rand.NextNumber(rangeY.x, rangeY.y) * dt, 0.01);
            const z = RoundDecimal(Rand.NextNumber(rangeZ.x, rangeZ.y) * dt, 0.01);

            addition = { x, y, z };
            this.storedValues.set(data.particleId, addition);
        }

        data.rotation = new Vector3(data.rotation.X + addition.x, data.rotation.Y + addition.y, data.rotation.Z + addition.z);
    }

    GetNodeName(): string {
        return AddRotationXYZRandomName;
    }

    GetAutoGenerationCode(src: Src) {
        AutoGenUpdateNode(this, src, (varName) => {
            this.nodeFields.rangeX.AutoGenerateField(`${varName}.nodeFields.rangeX`, src);
            this.nodeFields.rangeY.AutoGenerateField(`${varName}.nodeFields.rangeY`, src);
            this.nodeFields.rangeZ.AutoGenerateField(`${varName}.nodeFields.rangeZ`, src);
        });
    }
}
