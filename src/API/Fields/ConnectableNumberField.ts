import type { ParticleData } from "API/ParticleService";
import type { Src } from "API/VFXScriptCreator";
import { NodeOutput } from "API/Outputs/NodeOutput";
import { NodeField } from "./NodeField";
import { NumberField } from "./NumberField";

interface SerializedData {
    number: number;
}

export class ConnectableNumberField extends NodeField {
    numberField: NumberField;
    // connectedNode: undefined | LogicNode;
    connectedOutput: undefined | NodeOutput

    constructor(number: number) {
        super();
        this.numberField = new NumberField(number);
    }

    GetNumberAsText = () => {
        return tostring(this.numberField.GetNumber());
    };

    GetNumber = (data: ParticleData) => {
        if (this.connectedOutput !== undefined) {
            return this.connectedOutput.GetOutput(data) as number;
        }

        return this.numberField.GetNumber();
    };

    SetNumber = (number: number) => {
        this.numberField.SetNumber(number);
        this.connectedOutput = undefined;
        this.FieldChanged.Fire();
    };

    ConnectOutput = (in_output: NodeOutput) => {
        this.connectedOutput = in_output;
        this.FieldChanged.Fire();
    };

    DisconnectOutput = () => {
        this.connectedOutput = undefined;
        this.FieldChanged.Fire();
    };

    AutoGenerateField(fieldPath: string, src: Src) {
        if (this.connectedOutput !== undefined) {
            const parentNode = this.connectedOutput.parent;

            let outputKey: string | number |undefined;

            for (const [key, out] of pairs(parentNode.nodeOutputs)) {
                if (out === this.connectedOutput) {
                    outputKey = key;
                    break;
                }
            }

            if (!outputKey) {

                warn(`ConnectableNumberField: no matching output on ${parentNode.GetClassName()}#${parentNode.id}`);
                return;
            }

            const className = parentNode.GetClassName();
            const varName = className + parentNode.id;

            parentNode.GetAutoGenerationCode(
                src,
                `${fieldPath}.ConnectOutput(${varName}.nodeOutputs.${outputKey})`
            );
            return;
        }

        src.value += `${fieldPath}.SetNumber(${this.numberField.GetNumber()}) \n`;
    }

    SerializeData() {
        return this.numberField.SerializeData();
    }

    ReadSerializedData(data: SerializedData) {
        this.SetNumber(data.number);
    }
}
