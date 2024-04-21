import { SetVelocityRandom } from "API/Nodes/Initialize/SetVelocityRandom";

export function AutoGenSetVelocityRandom(node: SetVelocityRandom) {
	const className = `SetVelocityRandom${node.id}`;
	const varName = `setVelocityRandom${node.id}`;

	let src = `local ${className} = TS.import(script, APIFolder, "Nodes", "Initialize", "SetVelocityRandom").SetVelocityRandom \n`;
	src += `local ${varName} = ${className}.new() \n`;
	src += `${varName}.nodeFields.rangeX.SetVector2(${node.nodeFields.rangeX.GetVector2()}) \n`;
	src += `${varName}.nodeFields.rangeY.SetVector2(${node.nodeFields.rangeY.GetVector2()}) \n`;
	src += `${varName}.nodeFields.rangeZ.SetVector2(${node.nodeFields.rangeZ.GetVector2()}) \n`;
	src += `nodeSystem:AddNode(${varName})`;

	return src;
}
