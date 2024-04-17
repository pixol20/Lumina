import Roact, { useRef } from "@rbxts/roact";
import { SetEmission as SetEmissionAPI, SetEmissionFieldNames } from "API/Nodes/Initialize/SetEmission";
import ConnectionPointIn from "Components/Connections/ConnectionPointIn";
import Div from "Components/Div";
import { NumberField } from "Components/NodeFields/NumberField";
import { AddNode, NodeData } from "Services/NodesService";
import { Node } from "../Node";

export function CreateSetEmission() {
	return AddNode(new SetEmissionAPI(), (data: NodeData) => {
		return <SetEmission key={data.id} data={data} />;
	});
}

function SetEmission({ data }: { data: NodeData }) {
	const emissionFieldRef = useRef((data.node as SetEmissionAPI).nodeFields.emission);

	return (
		<Node Name="Set Emission" Id={data.id} AnchorPoint={data.anchorPoint}>
			<uipadding PaddingLeft={new UDim(0, 10)} />

			<Div Size={UDim2.fromScale(1, 0)} AutomaticSize="Y">
				<uilistlayout FillDirection="Horizontal" Padding={new UDim(0, 5)} />

				<ConnectionPointIn
					Size={UDim2.fromOffset(20, 20)}
					NodeId={data.id}
					NodeFieldName={SetEmissionFieldNames.emission}
					NodeAbsolutePosition={data.anchorPoint}
					BindFunction={emissionFieldRef.current.BindNumber}
					UnbindFunction={emissionFieldRef.current.UnbindNumber}
				/>
				<NumberField
					Size={new UDim2(1, -25, 0, 0)}
					Label={"Emission"}
					DefaultText={tostring(emissionFieldRef.current.GetNumber())}
					TextToInputRatio={0.4}
					Disabled={emissionFieldRef.current.boundNode !== undefined}
					NumberChanged={emissionFieldRef.current.SetNumber}
				/>
			</Div>
		</Node>
	);
}
