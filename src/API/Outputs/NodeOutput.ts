import { Event } from "API/Bindables/Event";
import type { Src } from "API/VFXScriptCreator";
import { ParticleData } from "API/ParticleService";
import { LogicNode } from "API/Nodes/Logic/LogicNode";

export abstract class NodeOutput {
    abstract parent: LogicNode;
    abstract GetOutput(data: ParticleData): unknown;
    abstract SerializeData(): unknown;
    abstract ReadSerializedData(data: unknown): void;
    OutputChanged = new Event();
    LatestFrameId = -1;
}
