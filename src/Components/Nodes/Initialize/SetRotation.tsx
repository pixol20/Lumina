import React, { useEffect, useRef, useState } from "@rbxts/react";
import { CalculationType } from "API/Nodes/FieldStates";
import { IsAxisX, IsAxisY, IsAxisZ } from "API/Nodes/FieldStatesLib";
import { SetRotation as SetRotationAPI, SetRotationFieldNames } from "API/Nodes/Initialize/SetRotation";
import ConnectableNumberField from "Components/NodeFields/ConnectableNumberField";
import { ConnectableVector2Field } from "Components/NodeFields/ConnectableVector2Field";
import StateField from "Components/NodeFields/StateField";
import { AddNode, type NodeData } from "Services/NodesService";
import Node from "../Node";

export function CreateSetRotation() {
    return AddNode(new SetRotationAPI(), (data: NodeData) => {
        return (
            <SetRotationZ
                key={data.node.updateOrder === -1 ? `node_${data.node.id}` : `node_${data.node.updateOrder}_${data.node.id}`}
                data={data}
            />
        );
    });
}

function SetRotationZ({ data }: { data: NodeData }) {
    const [_, setForceRender] = useState(0);

    const calculationTypeRef = useRef((data.node as SetRotationAPI).nodeFields.calculationType);
    const axisTypeRef = useRef((data.node as SetRotationAPI).nodeFields.axisType);

    useEffect(() => {
        const connection1 = calculationTypeRef.current.FieldChanged.Connect(() => {
            setForceRender((prev) => prev + 1);

            task.spawn(() => {
                task.wait();
                setForceRender((prev) => prev + 1);
            });
        });

        const connection2 = axisTypeRef.current.FieldChanged.Connect(() => {
            setForceRender((prev) => prev + 1);

            task.spawn(() => {
                task.wait();
                setForceRender((prev) => prev + 1);
            });
        });

        return () => {
            connection1.Disconnect();
            connection2.Disconnect();
        };
    }, []);

    const isUniform = () => {
        return calculationTypeRef.current.GetState() === CalculationType.Uniform;
    };

    const isRandom = () => {
        return calculationTypeRef.current.GetState() === CalculationType.Random;
    };

    const axisType = axisTypeRef.current.GetState();

    return (
        <Node
            Name="Set Rotation"
            NodeId={data.node.id}
            NodeAnchorPoint={data.anchorPoint}
            IsConnectedToSystem={data.node.connectedSystemId !== undefined}
        >
            <StateField NodeField={calculationTypeRef.current} />
            <StateField NodeField={axisTypeRef.current} />

            {IsAxisX(axisType) && isUniform() && (
                <ConnectableNumberField
                    NodeId={data.node.id}
                    NodeField={(data.node as SetRotationAPI).nodeFields.rotationX}
                    NodeFieldName={SetRotationFieldNames.rotationX}
                    Label="X"
                />
            )}
            {IsAxisX(axisType) && isRandom() && (
                <ConnectableVector2Field
                    NodeId={data.node.id}
                    NodeField={(data.node as SetRotationAPI).nodeFields.rangeX}
                    NodeFieldName={SetRotationFieldNames.rangeX}
                    Label={IsAxisY(axisType) || IsAxisZ(axisType) ? "X" : undefined}
                    ValueLabels={["Min", "Max"]}
                />
            )}

            {IsAxisY(axisType) && isUniform() && (
                <ConnectableNumberField
                    NodeId={data.node.id}
                    NodeField={(data.node as SetRotationAPI).nodeFields.rotationY}
                    NodeFieldName={SetRotationFieldNames.rotationY}
                    Label="Y"
                />
            )}
            {IsAxisY(axisType) && isRandom() && (
                <ConnectableVector2Field
                    NodeId={data.node.id}
                    NodeField={(data.node as SetRotationAPI).nodeFields.rangeY}
                    NodeFieldName={SetRotationFieldNames.rangeY}
                    Label={IsAxisX(axisType) || IsAxisZ(axisType) ? "Y" : undefined}
                    ValueLabels={["Min", "Max"]}
                />
            )}

            {IsAxisZ(axisType) && isUniform() && (
                <ConnectableNumberField
                    NodeId={data.node.id}
                    NodeField={(data.node as SetRotationAPI).nodeFields.rotationZ}
                    NodeFieldName={SetRotationFieldNames.rotationZ}
                    Label="Z"
                />
            )}
            {IsAxisZ(axisType) && isRandom() && (
                <ConnectableVector2Field
                    NodeId={data.node.id}
                    NodeField={(data.node as SetRotationAPI).nodeFields.rangeZ}
                    NodeFieldName={SetRotationFieldNames.rangeZ}
                    Label={IsAxisX(axisType) || IsAxisY(axisType) ? "Z" : undefined}
                    ValueLabels={["Min", "Max"]}
                />
            )}
        </Node>
    );
}
