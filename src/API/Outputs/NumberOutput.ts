import { LogicNode } from "API/Nodes/Logic/LogicNode";
import { NodeOutput } from "./NodeOutput";
import { ParticleData } from "API/ParticleService";

interface SerializedData {
    number: number;
}

export class NumberOutput extends NodeOutput {
    parent: LogicNode;
    number: number;

    constructor(parent: LogicNode, number: number) {
        super();
        this.parent = parent;
        this.number = number;
    }

    SerializeData() {
        return {
            number: this.number,
        };
    }

    GetOutput(data: ParticleData): number {
        if ((data.frameId !== this.LatestFrameId) || (data.frameId === 0)) {
            this.Recalculate(data);
        }
        this.LatestFrameId = data.frameId;
        return this.number;
    }

    Recalculate(data: ParticleData): void {
        this.parent.Calculate(data);
    }

    SetOutput(output: number): void {
        this.number = output
    }

    ReadSerializedData(data: SerializedData): void {
        this.SetOutput(data.number);
    }
}
