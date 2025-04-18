import { NumberField } from "API/Fields/NumberField";
import { StateField } from "API/Fields/StateField";
import { Vector2Field } from "API/Fields/Vector2Field";
import { Vector3Field } from "API/Fields/Vector3Field";
import { ValueType } from "../FieldStates";
import { LogicNode } from "./LogicNode";
import { UnknownOutput } from "API/Outputs/UnknownOutput";


export class ValueOut extends LogicNode {
    static className = "ValueOut";

    nodeFields = {
        valueType: new StateField(ValueType, ValueType.Number),
        numberIn: new NumberField(0),
        vector2In: new Vector2Field(0, 0),
        vector3In: new Vector3Field(0, 0, 0),
    };

    nodeOutputs: { result: UnknownOutput } = {
        result: new UnknownOutput(this, 0)
    };
    
    Calculate = () => {
        let value: unknown;

        switch (this.nodeFields.valueType.GetState()) {
            case ValueType.Number:
                value = this.nodeFields.numberIn.GetNumber();
                break;
            case ValueType.Vector2:
                let simpleVector2 =  this.nodeFields.vector2In.GetVector2();
                value = new Vector2(simpleVector2.x, simpleVector2.y)
                break;
            case ValueType.Vector3:
                let simpleVector3 = this.nodeFields.vector3In.GetVector3();
                value = new Vector3(simpleVector3.x, simpleVector3.y, simpleVector3.z);
                break;
        }

        this.nodeOutputs.result.SetOutput(value);
    };

    GetClassName(): string {
        return ValueOut.className;
    }
}
