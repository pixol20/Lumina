import { LogicNode } from "API/Nodes/Logic/LogicNode";
import { NodeOutput } from "./NodeOutput";
import { ParticleData } from "API/ParticleService";

interface SerializedData {
    vector: Vector3;
}

export class Vector3Output extends NodeOutput {


    parent: LogicNode;
    vector: Vector3;

    constructor(parent: LogicNode, vector: Vector3){
        super();
        this.parent = parent;
        this.vector = vector;
    }

    SerializeData()  {
        return {
            vector: this.vector
        };
    }
    
    GetOutput(data: ParticleData) : Vector3 {
        if ((data.frameId !== this.LatestFrameId) || (data.frameId === 0)) {
            this.Recalculate(data);
        }
        this.LatestFrameId = data.frameId;
        return this.vector;
    }

    Recalculate = (data: ParticleData) => {
        this.parent.Calculate(data);
    }

    SetOutput (output: Vector3): void {
        this.vector = output
    }

    ReadSerializedData(data: SerializedData) {
        this.SetOutput(data.vector);
    }

}