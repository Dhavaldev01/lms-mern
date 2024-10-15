import { Input } from "../input";
import { Label } from "../label";
import {
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../select";
import { Textarea } from "../textarea";


function FormControls({ formControls = [], formData, setFormData }) {
  function renderComponentByType(getControlItem) {
    let element = null;

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
          />
        );
        break;

      case "select":
        element = (
          <select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={getControlItem.label} />
            </SelectTrigger>
            <SelectContent>
              {getControlItem.options && getControlItem.options.length > 0
                ? getControlItem.options.map((optionItems) => (
                    <SelectItem key={optionItems.id} value={optionItems.id}>
                      {optionItems.label}
                    </SelectItem>
                  ))
                : null}
            </SelectContent>
          </select>
        );
        break;

      case "textarea":
        element = <Textarea
        id={getControlItem.name}
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}

        />;
        break;
      default:
        element = <Input 
        id={getControlItem.name}
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        type={getControlItem.type}
        />;
        break;
        
    }
    return element;
  }
  return (
    <div className="flex flex-col gap-3">
      <label htmlFor=""></label>
      {formControls.map((controleItem) => (
        <div key={controleItem.name}>
          <Label className = "flex justify-start p-2"htmlFor={controleItem.name}>{controleItem.label}</Label>
          {renderComponentByType(controleItem)}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
