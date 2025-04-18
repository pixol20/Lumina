import React, { useEffect, useRef, useState } from "@rbxts/react";
import { ValueType } from "API/Nodes/FieldStates";
import { VectorSplit as VectorSplitAPI } from "API/Nodes/Logic/VectorSplit";
import StateField from "Components/NodeFields/StateField";
import { ConnectableVector2Field } from "Components/NodeFields/ConnectableVector2Field";
import ConnectableVector3Field from "Components/NodeFields/ConnectableVector3Field";
import { AddNode, type NodeData } from "Services/NodesService";
import Node from "../Node";
import ConnectionPointOut from "Components/Connections/ConnectionPointOut";

export function CreateVectorSplit() {
    return AddNode(new VectorSplitAPI(), (data: NodeData) => {
        return (
            <VectorSplit
                key={
                    data.node.updateOrder === -1
                        ? `node_${data.node.id}`
                        : `node_${data.node.updateOrder}_${data.node.id}`
                }
                data={data}
            />
        );
    });
}

function VectorSplit({ data }: { data: NodeData }) {
    const [, setForceRender] = useState(0);

    const valueTypeRef = useRef((data.node as VectorSplitAPI).nodeFields.valueType);
    const valueType = valueTypeRef.current.GetState();

    useEffect(() => {
        const conn = valueTypeRef.current.FieldChanged.Connect(() => {
            task.wait();
            setForceRender((prev) => prev + 1);
        });
        return () => conn.Disconnect();
    }, []);

    return (
        <Node
            Name="Vector Split"
            NodeId={data.node.id}
            NodeAnchorPoint={data.anchorPoint}
            IsConnectedToSystem={data.node.connectedSystemId !== undefined}
            Width={120}
        >

            <StateField NodeId={data.node.id} NodeField={valueTypeRef.current} />


            {valueType === ValueType.Vector2 && (
                <ConnectableVector2Field
                    NodeId={data.node.id}
                    NodeField={(data.node as VectorSplitAPI).nodeFields.vector2}
                    NodeFieldName="vector2"
                    Label="In"
                />
            )}
            {valueType === ValueType.Vector3 && (
                <ConnectableVector3Field
                    NodeId={data.node.id}
                    NodeField={(data.node as VectorSplitAPI).nodeFields.vector3}
                    NodeFieldName="vector3"
                    Label="In"
                />
            )}


            <ConnectionPointOut
                NodeId={data.node.id}
                Label="X"
                NodeOutput={(data.node as VectorSplitAPI).nodeOutputs.x}
                ValueType={ValueType.Number}
            />
            <ConnectionPointOut
                NodeId={data.node.id}
                Label="Y"
                NodeOutput={(data.node as VectorSplitAPI).nodeOutputs.y}
                ValueType={ValueType.Number}
            />

            {valueType === ValueType.Vector3 && (
                <ConnectionPointOut
                    NodeId={data.node.id}
                    Label="Z"
                    NodeOutput={(data.node as VectorSplitAPI).nodeOutputs.z}
                    ValueType={ValueType.Number}
                />
            )}
        </Node>
    );
}
