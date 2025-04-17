// import type { LogicNode } from "API/Nodes/Logic/LogicNode";
import type { ParticleData } from "API/ParticleService";
import type { Src } from "API/VFXScriptCreator";
import { NodeField } from "./NodeField";
import { type SimpleVector3, Vector3Field } from "./Vector3Field";
import { NodeOutput } from "API/Outputs/NodeOutput";
import { LogicNode } from "API/Nodes/Logic/LogicNode";

interface SerializedData {
    x: number;
    y: number;
    z: number;
}

export class ConnectableVector3Field extends NodeField {
    vector3Field: Vector3Field;
    connectedOutputVector3: undefined | NodeOutput;
    connectedOutputX: undefined | NodeOutput;
    connectedOutputY: undefined | NodeOutput;
    connectedOutputZ: undefined | NodeOutput;

    constructor(x: number, y: number, z: number) {
        super();
        this.vector3Field = new Vector3Field(x, y, z);
    }

    GetSimpleVector3(data: ParticleData): SimpleVector3 {
        if (this.connectedOutputVector3 !== undefined) {
            const vec3 = this.connectedOutputVector3.GetOutput(data) as Vector3;
            return { x: vec3.X, y: vec3.Y, z: vec3.Z };
        }

        const x = this.GetX(data);
        const y = this.GetY(data);
        const z = this.GetZ(data);

        return { x, y, z };
    }

    GetVector3(data: ParticleData) {
        if (this.connectedOutputVector3 !== undefined) return this.connectedOutputVector3.GetOutput(data) as Vector3;

        const x = this.GetX(data);
        const y = this.GetY(data);
        const z = this.GetZ(data);

        return new Vector3(x, y, z);
    }

    GetXAsText = () => {
        return tostring(this.vector3Field.GetX());
    };

    GetX = (data: ParticleData) => {
        if (this.connectedOutputX !== undefined) {
            return this.connectedOutputX.GetOutput(data) as number;
        }

        return this.vector3Field.GetX();
    };

    GetYAsText = () => {
        return tostring(this.vector3Field.GetY());
    };

    GetY = (data: ParticleData) => {
        if (this.connectedOutputY !== undefined) {
            return this.connectedOutputY.GetOutput(data) as number;
        }

        return this.vector3Field.GetY();
    };

    GetZAsText = () => {
        return tostring(this.vector3Field.GetZ());
    };

    GetZ = (data: ParticleData) => {
        if (this.connectedOutputZ !== undefined) {
            return this.connectedOutputZ.GetOutput(data) as number;
        }

        return this.vector3Field.GetZ();
    };

    SetVector3 = (x: number, y: number, z: number) => {
        this.connectedOutputVector3 = undefined;

        this.SetX(x, true);
        this.SetY(y, true);
        this.SetZ(z, true);

        this.FieldChanged.Fire();
    };

    SetX = (x: number, ignoreFieldChange = false) => {
        this.vector3Field.SetX(x);
        this.connectedOutputX = undefined;

        if (!ignoreFieldChange) return;
        this.FieldChanged.Fire();
    };

    SetY = (y: number, ignoreFieldChange = false) => {
        this.vector3Field.SetY(y);
        this.connectedOutputY = undefined;

        if (!ignoreFieldChange) return;
        this.FieldChanged.Fire();
    };

    SetZ = (z: number, ignoreFieldChange = false) => {
        this.vector3Field.SetZ(z);
        this.connectedOutputZ = undefined;

        if (!ignoreFieldChange) return;
        this.FieldChanged.Fire();
    };

    ConnectVector3 = (output: NodeOutput) => {
        this.connectedOutputVector3 = output;
        this.FieldChanged.Fire();
    };

    DisconnectVector3 = () => {
        this.connectedOutputVector3 = undefined;
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

    ConnectZ = (output: NodeOutput) => {
        this.connectedOutputZ = output;
        this.FieldChanged.Fire();
    };

    DisconnectZ = () => {
        this.connectedOutputZ = undefined;
        this.FieldChanged.Fire();
    };

    AutoGenerateField(fieldPath: string, src: Src) {
        if (this.connectedOutputVector3 !== undefined) {
            const parentNode = this.connectedOutputVector3.parent as LogicNode;
    
            let vec3Key: string | number | undefined;
            for (const [key, out] of pairs(parentNode.nodeOutputs)) {
                if (out === this.connectedOutputVector3) {
                    vec3Key = key;
                    break;
                }
            }
    
            if (!vec3Key) {
                warn(
                    `ConnectableVector3Field: could not find Vector3-output on ` +
                    `${parentNode.GetClassName()}#${parentNode.id}`
                );
            } else {
                const className = parentNode.GetClassName();
                const varName   = className + parentNode.id; // e.g. "mix3Node12"
                parentNode.GetAutoGenerationCode(
                    src,
                    `${fieldPath}.ConnectVector3(${varName}.nodeOutputs.${vec3Key})`
                );
            }
            return;
        }
    
        // --- X component ---
        if (this.connectedOutputX !== undefined) {
            const parentNode = this.connectedOutputX.parent as LogicNode;
            let outputXKey: string | number | undefined;
            for (const [key, out] of pairs(parentNode.nodeOutputs)) {
                if (out === this.connectedOutputX) {
                    outputXKey = key;
                    break;
                }
            }
            if (!outputXKey) {
                warn(
                    `ConnectableVector3Field: could not find X-output on ` +
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
            src.value += `${fieldPath}.SetX(${this.vector3Field.GetX()})\n`;
        }
    
        // --- Y component ---
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
                    `ConnectableVector3Field: could not find Y-output on ` +
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
            src.value += `${fieldPath}.SetY(${this.vector3Field.GetY()})\n`;
        }
    
        // --- Z component ---
        if (this.connectedOutputZ !== undefined) {
            const parentNode = this.connectedOutputZ.parent as LogicNode;
            let outputZKey: string | number | undefined;
            for (const [key, out] of pairs(parentNode.nodeOutputs)) {
                if (out === this.connectedOutputZ) {
                    outputZKey = key;
                    break;
                }
            }
            if (!outputZKey) {
                warn(
                    `ConnectableVector3Field: could not find Z-output on ` +
                    `${parentNode.GetClassName()}#${parentNode.id}`
                );
            } else {
                const className = parentNode.GetClassName();
                const varName   = className + parentNode.id;
                parentNode.GetAutoGenerationCode(
                    src,
                    `${fieldPath}.ConnectZ(${varName}.nodeOutputs.${outputZKey})`
                );
            }
        } else {
            src.value += `${fieldPath}.SetZ(${this.vector3Field.GetZ()})\n`;
        }
    }

    SerializeData() {
        return this.vector3Field.SerializeData();
    }

    ReadSerializedData(data: SerializedData) {
        this.SetVector3(data.x, data.y, data.z);
    }
}
