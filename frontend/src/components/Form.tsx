import { ChangeEvent, FormEvent, useRef, useState } from "react";
import axios from "axios";
import "./Form.css";
import { FormDropZone } from "./FormDropZone";
import { FormNameInput } from "./FormNameInput";
import { FormButtons } from "./FormButtons";
import { Snackbar } from "./Snackbar";

export const Form = () => {
  const [imageName, setImageName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);

  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);

  const handleSnackbarClose = () => {
    setSnackbarMessage(null);
  };

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageName(event.target.value);
    setValidationError(null);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    } else {
      setSelectedFile(null);
    }
    setValidationError(null);
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!imageName || !selectedFile) {
      console.error("Name and File are required");
      setValidationError("Both name and image file are required");
      return;
    }

    const formData = new FormData();
    formData.append("name", imageName);
    formData.append("photo", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3002/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("POST Response:", response.data);

      setSnackbarMessage("Image uploaded successfully!");

      setImageName("");
      setSelectedFile(null);

      // Reset the file input using useRef
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("POST Error:", error);
      setSnackbarMessage("Image couldn't be uploaded. Please try again.");
    }
  };

  const handleCancel = () => {
    setImageName("");
    setSelectedFile(null);
    setValidationError(null);

    // Reset the file input using useRef
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-wrapper">
      <article className="form-drop-zone">
        <FormDropZone
          onFileChange={handleFileChange}
          fileInputRef={fileInputRef}
        />
      </article>
      <article className="form-name-input">
        <FormNameInput
          inputValue={imageName}
          onInputChange={handleNameChange}
        />
        <span className="form-span">
          {validationError && (
            <div className="form-validation">{validationError}</div>
          )}
        </span>
        <FormButtons onCancelClick={handleCancel} />
      </article>
      {snackbarMessage && (
        <Snackbar
          message={snackbarMessage}
          onClose={handleSnackbarClose}
          error={snackbarMessage.toLowerCase().includes("couldn't")}
        />
      )}
    </form>
  );
};
