import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";


function FormControls({ formControls = [], formData, setFormData }) {
  function renderComponentByType(getControlItem) {
    let element = null;
    const currentControlItemvalue = formData[getControlItem.name || '']

    switch (getControlItem.componentType) {
      case "input":
        element = (
          <Input
            id={getControlItem.name}
            name={getControlItem.name}
            placeholder={getControlItem.placeholder}
            type={getControlItem.type}
            value={currentControlItemvalue}
            onChange ={(event)=> setFormData({
              ...formData,
              [getControlItem.name] : event.target.value
            })}
          />
        );
        break;

      case "select":
        element = (
          <Select
          onValueChange={(value)=> setFormData({
            ...formData ,
            [getControlItem.name] : value
          })}
          value={currentControlItemvalue}
          >
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
          </Select>
        );
        break;

      case "textarea":
        element = <Textarea
        id={getControlItem.name}
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        value={currentControlItemvalue}
        onChange ={(event)=> setFormData({
          ...formData,
          [getControlItem.name] : event.target.value
        })}

        />;
        break;
      default:
        element = <Input 
        id={getControlItem.name}
        name={getControlItem.name}
        placeholder={getControlItem.placeholder}
        type={getControlItem.type}
        value={currentControlItemvalue}
        onChange ={(event)=> setFormData({
          ...formData,
          [getControlItem.name] : event.target.value
        })}
        
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
          <Label className = "flex justify-start m-1"htmlFor={controleItem.name}>{controleItem.label}</Label>
          {renderComponentByType(controleItem)}
        </div>
      ))}
    </div>
  );
}

export default FormControls;
