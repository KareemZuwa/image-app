import { ChangeEvent, FormEvent, useRef, useState } from "react";
import axios from "axios";
import "./Form.css";
import { FormDropZone } from "./FormDropZone";
import { FormNameInput } from "./FormNameInput";
import { FormButtons } from "./FormButtons";

export const MainContent = () => {
  const [imageName, setImageName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  console.log(imageName, selectedFile);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setImageName(event.target.value);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;

    if (files && files.length > 0) {
      setSelectedFile(files[0]);
    } else {
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);

    if (!imageName || !selectedFile) {
      console.error("Name and File are required");
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

      // Optionally, reset the form after a successful submission
      setImageName("");
      setSelectedFile(null);

      // Reset the file input using useRef
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  const handleCancel = () => {
    setImageName("");
    setSelectedFile(null);

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
        <FormButtons onCancelClick={handleCancel} />
      </article>
    </form>
  );
};
