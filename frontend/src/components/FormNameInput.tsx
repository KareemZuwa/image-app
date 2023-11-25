import { ChangeEvent } from "react";
import "./FormNameInput.css";

interface FormNameInputProps {
  inputValue: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FormNameInput = ({
  inputValue,
  onInputChange,
}: FormNameInputProps) => {
  return (
    <label className="form-name-input-label">
      Image Name:
      <input
        className="form-name-input-field"
        type="text"
        value={inputValue}
        onChange={onInputChange}
        placeholder="Name your image..."
      />
    </label>
  );
};
