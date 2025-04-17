import type { LogicNode } from "API/Nodes/Logic/LogicNode";
import type { ParticleData } from "API/ParticleService";
import type { Src } from "API/VFXScriptCreator";
import { NodeField } from "./NodeField";
import { type SimpleVector2, Vector2Field } from "./Vector2Field";
import { NodeOutput } from "API/Outputs/NodeOutput";

interface SerializedData {
    x: number;
    y: number;
}

export class ConnectableVector2Field extends NodeField {
    vector2Field: Vector2Field;
    connectedOutputVector2: undefined | NodeOutput;
    connectedOutputX: undefined | NodeOutput;
    connectedOutputY: undefined | NodeOutput;

    constructor(x: number, y: number) {
        super();
        this.vector2Field = new Vector2Field(x, y);
    }

    GetSimpleVector2(data: ParticleData): SimpleVector2 {
        if (this.connectedOutputVector2 !== undefined) {
            const vec2 = this.connectedOutputVector2.GetOutput(data) as Vector2;
            return { x: vec2.X, y: vec2.Y };
        }

        const x = this.GetX(data);
        const y = this.GetY(data);

        return { x, y };
    }

    GetVector2(data: ParticleData) {
        if (this.connectedOutputVector2 !== undefined) return this.connectedOutputVector2.GetOutput(data) as Vector2;

        const x = this.GetX(data);
        const y = this.GetY(data);

        return new Vector2(x, y);
    }

    GetXAsText = () => {
        return tostring(this.vector2Field.GetX());
    };

    GetX = (data: ParticleData) => {
        if (this.connectedOutputX !== undefined) {
            return this.connectedOutputX.GetOutput(data) as number;
        }

        return this.vector2Field.GetX();
    };

    GetYAsText = () => {
        return tostring(this.vector2Field.GetY());
    };

    GetY = (data: ParticleData) => {
        if (this.connectedOutputY !== undefined) {
            return this.connectedOutputY.GetOutput(data) as number;
        }

        return this.vector2Field.GetY();
    };

    SetVector2 = (x: number, y: number) => {
        this.connectedOutputVector2 = undefined;

        this.SetX(x, true);
        this.SetY(y, true);

        this.FieldChanged.Fire();
    };

    SetX = (x: number, ignoreFieldChange = false) => {
        this.vector2Field.SetX(x);
        this.connectedOutputX = undefined;

        if (!ignoreFieldChange) return;
        this.FieldChanged.Fire();
    };

    SetY = (y: number, ignoreFieldChange = false) => {
        this.vector2Field.SetY(y);
        this.connectedOutputY = undefined;

        if (!ignoreFieldChange) return;
        this.FieldChanged.Fire();
    };

    ConnectVector2 = (output: NodeOutput) => {
        this.connectedOutputVector2 = output;
        this.FieldChanged.Fire();
    };

    DisconnectVector2 = () => {
        this.connectedOutputVector2 = undefined;
        this.FieldChanged.Fire();
    };

    ConnectX = (output: NodeOutput) => {
        this.connectedOutputX = output;
        this.FieldChanged.Fire();
    };

    DisconnectX = () => {
        this.connectedOutputX = undefined;
        this.FieldChanged.Fire();
    };

    ConnectY = (output: NodeOutput) => {
        this.connectedOutputY = output;
        this.FieldChanged.Fire();
    };

    DisconnectY = () => {
        this.connectedOutputY = undefined;
        this.FieldChanged.Fire();
    };

    AutoGenerateField(fieldPath: string, src: Src) {
        // --- X component ---
        if (this.connectedOutputX !== undefined) {
            const parentNode = this.connectedOutputX.parent as LogicNode;
    
            // find which key in nodeOutputs maps to this.connectedOutputX
            let outputXKey: string | number | undefined;
            for (const [key, out] of pairs(parentNode.nodeOutputs)) {
                if (out === this.connectedOutputX) {
                    outputXKey = key;
                    break;
                }
            }
    
            if (!outputXKey) {
                warn(
                    `ConnectableVector2Field: could not find X-output on ` +
                    `${parentNode.GetClassName()}#${parentNode.id}`
                );
            } else {
                const className = parentNode.GetClassName();
                const varName   = className + parentNode.id;
    
                parentNode.GetAutoGenerationCode(
                    src,
                    `${fieldPath}.ConnectX(${varName}.nodeOutputs.${outputXKey})`
                );
            }
        } else {
            src.value += `${fieldPath}.SetX(${this.vector2Field.GetX()})\n`;
        }
    

        if (this.connectedOutputY !== undefined) {
            const parentNode = this.connectedOutputY.parent as LogicNode;
    

            let outputYKey: string | number | undefined;
            for (const [key, out] of pairs(parentNode.nodeOutputs)) {
                if (out === this.connectedOutputY) {
                    outputYKey = key;
                    break;
                }
            }
    
            if (!outputYKey) {
                warn(
                    `ConnectableVector2Field: could not find Y-output on ` +
                    `${parentNode.GetClassName()}#${parentNode.id}`
                );
            } else {
                const className = parentNode.GetClassName();
                const varName   = className + parentNode.id;
    
                parentNode.GetAutoGenerationCode(
                    src,
                    `${fieldPath}.ConnectY(${varName}.nodeOutputs.${outputYKey})`
                );
            }
        } else {
            src.value += `${fieldPath}.SetY(${this.vector2Field.GetY()})\n`;
        }
    }

    SerializeData() {
        return this.vector2Field.SerializeData();
    }

    ReadSerializedData(data: SerializedData) {
        this.SetVector2(data.x, data.y);
    }
}
