import { ConnectableVector2Field } from "API/Fields/ConnectableVector2Field";
import { ConnectableVector3Field } from "API/Fields/ConnectableVector3Field";
import { StateField } from "API/Fields/StateField";
import type { ParticleData } from "API/ParticleService";
import { ValueType } from "../FieldStates";
import { LogicNode } from "./LogicNode";
import { NumberOutput } from "API/Outputs/NumberOutput";

export class VectorSplit extends LogicNode {
    static className = "VectorSplit";

    nodeFields = {
        valueType: new StateField(ValueType, ValueType.Vector3, [ValueType.Number]),

        vector2: new ConnectableVector2Field(0, 0),
        vector3: new ConnectableVector3Field(0, 0, 0),
    };

    nodeOutputs: { x: NumberOutput; y: NumberOutput; z: NumberOutput } = {
        x: new NumberOutput(this, 0),
        y: new NumberOutput(this, 0),
        z: new NumberOutput(this, 0),
    };

    Calculate = (data: ParticleData) => {
        const vt = this.nodeFields.valueType.GetState();

        if (vt === ValueType.Vector2) {
            const v2 = this.nodeFields.vector2.GetVector2(data);
            this.nodeOutputs.x.SetOutput(v2.X);
            this.nodeOutputs.y.SetOutput(v2.Y);

        } else if (vt === ValueType.Vector3) {
            const v3 = this.nodeFields.vector3.GetSimpleVector3(data);
            this.nodeOutputs.x.SetOutput(v3.x);
            this.nodeOutputs.y.SetOutput(v3.y);
            this.nodeOutputs.z.SetOutput(v3.z);;
        } else {
            warn("VectorSplit: unsupported ValueType");
        }
    };

    GetClassName(): string {
        return VectorSplit.className;
    }
}
