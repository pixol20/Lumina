import React from "@rbxts/react";
import { ValueType } from "API/Nodes/FieldStates";
import { Time as TimeAPI } from "API/Nodes/Logic/Time";
import Div from "Components/Div";
import { AddNode, type NodeData } from "Services/NodesService";
import Node from "../Node";
import ConnectionPointOut from "Components/Connections/ConnectionPointOut";

export function CreateTime() {
    return AddNode(new TimeAPI(), (data: NodeData) => {
        return (
            <Time
                key={data.node.updateOrder === -1 ? `node_${data.node.id}` : `node_${data.node.updateOrder}_${data.node.id}`}
                data={data}
            />
        );
    });
}

function Time({ data }: { data: NodeData }) {
    return (
        <Node
            Name="Time"
            Width={100}
            NodeId={data.node.id}
            NodeAnchorPoint={data.anchorPoint}
            IsConnectedToSystem={data.node.connectedSystemId !== undefined}
            ConnectionValueType={ValueType.Number}
        >
            <ConnectionPointOut NodeId={data.node.id} Label="Time" NodeOutput={(data.node as TimeAPI).nodeOutputs.result} ValueType={ValueType.Number} />
            <Div Size={UDim2.fromOffset(0, 0)} />
        </Node>
    );
}
