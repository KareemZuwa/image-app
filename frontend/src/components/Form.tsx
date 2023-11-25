import { ChangeEvent, FormEvent, useState } from "react";
import axios from "axios";
import "./Form.css";
import { FormDropZone } from "./FormDropZone";
import { FormNameInput } from "./FormNameInput";
import { FormButtons } from "./FormButtons";

export const MainContent = () => {
  const [imageName, setImageName] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  console.log(imageName, selectedFile);

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

  //do the fetch shiet here

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);

    // Check if both imageName and selectedFile are provided
    if (!imageName || !selectedFile) {
      console.error("Name and File are required");
      return;
    }

    // Create a FormData object to send the data as a multipart/form-data
    const formData = new FormData();
    formData.append("name", imageName);
    formData.append("photo", selectedFile);

    try {
      const response = await axios.post(
        "http://localhost:3002/images",
        formData,
        {
          // Add headers here
          headers: {
            "Content-Type": "multipart/form-data",
            // Add any other headers if required
          },
        }
      );

      console.log("POST Response:", response.data);

      // Optionally, reset the form after a successful submission
      setImageName("");
      setSelectedFile(null);
    } catch (error) {
      console.error("POST Error:", error);
    }
  };

  // end of fetch dshiet here

  const handleCancel = () => {
    setImageName("");
    setSelectedFile(null);
  };

  return (
    <form onSubmit={handleSubmit} className="form-wrapper">
      <article className="form-drop-zone">
        <FormDropZone onFileChange={handleFileChange} />
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
