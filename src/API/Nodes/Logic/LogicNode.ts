import { NodeGroups } from "API/NodeGroup";
import type { ParticleData } from "API/ParticleService";
import { Node } from "../Node";
import { NodeOutput } from "API/Outputs/NodeOutput";

export abstract class LogicNode extends Node {
    static nodeGroups = [NodeGroups.Logic];

    GetNodeGroups(): NodeGroups[] {
        return LogicNode.nodeGroups;
    }

    GetNodeFolderName(): string {
        return "Logic";
    }

    abstract nodeOutputs: { [key: string]: NodeOutput }; 

    abstract Calculate: (data: ParticleData) => void;
}
