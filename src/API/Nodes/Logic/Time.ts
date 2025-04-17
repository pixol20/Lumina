import { LogicNode } from "./LogicNode";
import { NumberOutput } from "API/Outputs/NumberOutput";

export class Time extends LogicNode {
    static className = "Time";

    nodeFields = {};

    nodeOutputs: { result: NumberOutput } = {
        result: new NumberOutput(this, 0)
    };

    Calculate = () => {
        this.nodeOutputs.result.SetOutput(os.clock());
    };

    GetClassName(): string {
        return Time.className;
    }
}
