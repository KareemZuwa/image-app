import { ChangeEvent } from "react";
import "./FormDropZone.css";

interface FormDropZoneProps {
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export const FormDropZone = ({ onFileChange }: FormDropZoneProps) => {
  return (
    <div className="form-drop-zone-container">
      <label htmlFor="file-input" className="form-drop-zone-label">
        Image Upload:
        <input
          className="file-input"
          type="file"
          name="image"
          accept=".jpeg, .png"
          onChange={onFileChange}
        />
      </label>
      <p>File must be in PNG or JPEG format</p>
    </div>
  );
};
