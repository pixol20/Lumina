import Roact from "@rbxts/roact";
import { SetColor as SetColorAPI } from "API/Nodes/Initialize/SetColor";
import Div from "Components/Div";
import { ColorPickerField } from "Components/NodeFields/ColorPickerField";
import { AddNode, NodeData } from "Services/NodesService";
import { Node } from "../Node";

export function CreateSetColor() {
	return AddNode(new SetColorAPI(), (data: NodeData) => {
		return <SetColor key={data.id} data={data} />;
	});
}

function SetColor({ data }: { data: NodeData }) {
	return (
		<Node Name="Set Color" Id={data.id} AnchorPoint={data.anchorPoint}>
			<uipadding PaddingLeft={new UDim(0, 10)} />

			<Div Size={UDim2.fromScale(1, 0)} AutomaticSize="Y">
				<uilistlayout FillDirection="Horizontal" Padding={new UDim(0, 5)} />
				<ColorPickerField Label="Color" ColorPicker={(data.node as SetColorAPI).nodeFields.color} />
			</Div>
		</Node>
	);
}
