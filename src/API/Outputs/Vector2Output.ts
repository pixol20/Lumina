import { LogicNode } from "API/Nodes/Logic/LogicNode";
import { NodeOutput } from "./NodeOutput";
import { ParticleData } from "API/ParticleService";

interface SerializedData {
    vector: Vector2;
}

export class Vector2Output extends NodeOutput {


    parent: LogicNode;
    vector: Vector2;

    constructor(parent: LogicNode, vector: Vector2){
        super();
        this.parent = parent;
        this.vector = vector;
    }

    SerializeData()  {
        return {
            vector: this.vector
        };
    }
    
    GetOutput(data: ParticleData) : Vector2 {
        if ((data.frameId !== this.LatestFrameId) || (data.frameId === 0)) {
            this.Recalculate(data);
        }
        this.LatestFrameId = data.frameId;
        return this.vector;
    }

    Recalculate = (data: ParticleData) => {
        this.parent.Calculate(data);
    }

    SetOutput (output: Vector2): void {
        this.vector = output
    }

    ReadSerializedData(data: SerializedData) {
        this.SetOutput(data.vector);
    }

}