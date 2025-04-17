import type { ParticleData } from "API/ParticleService";
import { LogicNode } from "./LogicNode";
import { NumberOutput } from "API/Outputs/NumberOutput";

export class AliveTime extends LogicNode {
    static className = "AliveTime";

    nodeFields = {};

    nodeOutputs: { aliveTime: NumberOutput } = {
        aliveTime: new NumberOutput(this, 0)
    };

    Calculate = (data: ParticleData) => {
        this.nodeOutputs.aliveTime.SetOutput(data.alivetime)
    };

    GetClassName(): string {
        return AliveTime.className;
    }
}
