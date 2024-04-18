import Roact, { useRef } from "@rbxts/roact";
import { ConstantSpawn as ConstantSpawnAPI } from "API/Nodes/Spawn/ConstantSpawn";
import { NumberField } from "Components/NodeFields/NumberField";
import { AddNode, NodeData } from "Services/NodesService";
import { Node } from "../Node";

export function CreateConstantSpawn() {
	return AddNode(new ConstantSpawnAPI(), (data: NodeData) => {
		return <ConstantSpawn key={`node_${data.node.id}`} data={data} />;
	});
}

function ConstantSpawn({ data }: { data: NodeData }) {
	const rateFieldRef = useRef((data.node as ConstantSpawnAPI).nodeFields.rate);

	const rateChanged = (number: number) => {
		if (number > 1000) {
			rateFieldRef.current.SetNumber(1000);
		}

		rateFieldRef.current.SetNumber(number);
	};

	return (
		<Node Name="Constant Spawn" Id={data.node.id} AnchorPoint={data.anchorPoint}>
			<NumberField
				Label="Rate"
				DefaultText={tostring(rateFieldRef.current.GetNumber())}
				NumberChanged={rateChanged}
			/>
		</Node>
	);
}
