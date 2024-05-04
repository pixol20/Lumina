import { NodeGroups } from "API/NodeGroup";
import { SetPosition } from "API/Nodes/Initialize/SetPosition";
import { SetVelocity } from "API/Nodes/Initialize/SetVelocity";
import { CreateSetLifetime } from "Components/Nodes/Initialize/SetLifetime";
import { CreateSetPosition } from "Components/Nodes/Initialize/SetPosition";
import { CreateParticlePlane } from "Components/Nodes/Render/ParticlePlane";
import { CreateConstantSpawn } from "Components/Nodes/Spawn/ConstantSpawn";
import { CreateSetVelocity } from "Lists/NodesListNodeBarrel";
import { CreateEmptySystem } from "./CreateEmptySystem";

export function CreateBasicSystem() {
    const system = CreateEmptySystem();
    const systemData = system.data;
    systemData.systemName = "Basic System";

    systemData.finishedBindingGroups.Connect(() => {
        const constantSpawn = CreateConstantSpawn();
        constantSpawn.elementLoaded.Connect(() => {
            systemData.addToNodeGroup[NodeGroups.Spawn]!(constantSpawn.data.node.id);
        });

        const setLifetime = CreateSetLifetime();
        setLifetime.elementLoaded.Connect(() => {
            systemData.addToNodeGroup[NodeGroups.Initialize]!(setLifetime.data.node.id);
        });

        const setPosition = CreateSetPosition();
        (setPosition.data.node as SetPosition).nodeFields.position.SetY(5);
        setPosition.elementLoaded.Connect(() => {
            systemData.addToNodeGroup[NodeGroups.Initialize]!(setPosition.data.node.id);
        });

        const setVelocity = CreateSetVelocity();
        (setVelocity.data.node as SetVelocity).nodeFields.velocity.SetY(5);
        setVelocity.elementLoaded.Connect(() => {
            systemData.addToNodeGroup[NodeGroups.Initialize]!(setVelocity.data.node.id);
        });

        const particlePlane = CreateParticlePlane();
        particlePlane.elementLoaded.Connect(() => {
            systemData.addToNodeGroup[NodeGroups.Render]!(particlePlane.data.node.id);
        });
    });

    return system;
}
