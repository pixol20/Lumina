import { NodeSystemData } from "Services/NodeSystemService";
import { NodeData } from "Services/NodesService";

export interface SelectionEntry {
	name: string;
	create?: () => NodeData | NodeSystemData | NodeSystemData[]; // technically only nodeData required, others just for compatability
}
