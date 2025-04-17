import { LogicNode } from "API/Nodes/Logic/LogicNode";
import { NodeOutput } from "./NodeOutput";
import { ParticleData } from "API/ParticleService";

interface SerializedData {
    value: unknown;
}

export class UnknownOutput extends NodeOutput {
    parent: LogicNode;
    value: unknown;

    constructor(parent: LogicNode, value: unknown) {
        super();
        this.parent = parent;
        this.value = value;
    }

    SerializeData() {
        return {
            value: this.value,
        };
    }

    GetOutput(data: ParticleData): unknown {
        if ((data.frameId !== this.LatestFrameId) || (data.frameId === 0)) {
            this.Recalculate(data);
        }
        this.LatestFrameId = data.frameId;
        return this.value;
    }

    Recalculate(data: ParticleData): void {
        this.parent.Calculate(data);
    }

    SetOutput(output: unknown): void {
        this.value = output
    }

    ReadSerializedData(data: SerializedData): void {
        this.SetOutput(data.value);
    }
}
