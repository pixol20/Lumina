import { Vector2Field } from "API/Fields/Vector2Field";
import { Rand, RoundDecimal } from "API/Lib";
import { GetParticleData } from "API/ParticleService";
import { NodeGroups } from "../../NodeGroup";
import { AutoGenSetRotationZRandom } from "../AutoGeneration/InitializeNodes/AutoGenSetRotationZRandom";
import { InitializeNode } from "./InitializeNode";

export const SetRotationZRandomName = "SetRotationZRandom";
export const SetRotationZRandomFieldNames = {
	range: "range",
};

export class SetRotationZRandom extends InitializeNode {
	nodeGroup: NodeGroups = NodeGroups.Initialize;
	nodeFields: {
		range: Vector2Field;
	};

	constructor() {
		super();

		this.nodeFields = {
			range: new Vector2Field(0, 0),
		};
	}

	Initialize(id: number) {
		const range = this.nodeFields.range.GetVector2();
		const zRotation = RoundDecimal(Rand.NextNumber(range.X, range.Y), 0.01);
		GetParticleData(id).particle.SurfaceGui.ImageLabel.Rotation = zRotation;
	}

	GetNodeName(): string {
		return SetRotationZRandomName;
	}

	GetAutoGenerationCode() {
		return AutoGenSetRotationZRandom(this);
	}
}
