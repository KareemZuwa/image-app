import { ChangeEvent, RefObject } from "react";
import "./FormDropZone.css";

interface FormDropZoneProps {
  onFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  fileInputRef: RefObject<HTMLInputElement>;
}

export const FormDropZone = ({
  onFileChange,
  fileInputRef,
}: FormDropZoneProps) => {
  return (
    <div className="form-drop-zone-container">
      <label htmlFor="file-input" className="form-drop-zone-label">
        Image Upload:
        <input
          className="file-input"
          type="file"
          name="image"
          accept="image/jpeg, image/png"
          onChange={onFileChange}
          ref={fileInputRef}
        />
      </label>
      <p className="form-drop-zone-message">
        File must be in PNG or JPEG format
      </p>
    </div>
  );
};
