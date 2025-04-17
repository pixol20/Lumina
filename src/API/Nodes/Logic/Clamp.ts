import { ConnectableNumberField } from "API/Fields/ConnectableNumberField";
import { ConnectableVector2Field } from "API/Fields/ConnectableVector2Field";
import type { ParticleData } from "API/ParticleService";
import { LogicNode } from "./LogicNode";
import { NumberOutput } from "API/Outputs/NumberOutput";

export class Clamp extends LogicNode {
    static className = "Clamp";

    nodeFields = {
        input: new ConnectableNumberField(0),
        range: new ConnectableVector2Field(0, 1),
    };
    
    nodeOutputs: { clamped: NumberOutput } = {
        clamped: new NumberOutput(this, 0)
    };
    
    Calculate = (data: ParticleData) => {
        const input = this.nodeFields.input.GetNumber(data);
        const range = this.nodeFields.range.GetSimpleVector2(data);
        this.nodeOutputs.clamped.SetOutput(math.clamp(input, range.x, range.y));
    };

    GetClassName(): string {
        return Clamp.className;
    }
}
