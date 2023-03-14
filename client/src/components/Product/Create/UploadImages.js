import React from "react";
import { useDropzone } from "react-dropzone";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const UploadImages = ({ setFieldValue, image }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
    onDrop: (acceptedFiles) => {
      setFieldValue(
        "image",
        image.concat(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        )
      );
    },
  });

  const removeImage = (index) => {
    const images = [...image];
    images.splice(index, 1);
    setFieldValue("image", images);
  };

  return (
    <div className="image-upload">
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} />
        <p>Drag and drop images here, or click to select files</p>
        <CloudUploadIcon sx={{ fontSize: 45 }} />
      </div>
      <div className="image-preview-container">
        {image.map((img, index) => (
          <div key={index} className="image-preview">
            <img src={img.preview} alt="Preview" />
            <button type="button" onClick={() => removeImage(index)}>
              Remove
            </button>
          </div>
        ))}
      </div>
      {/* <div className="image-path-container">
        <h3>Selected files:</h3>
        <ul>
          {imagePath.map((file, index) => (
            <li key={index}>
              {file.name} - {file.path}
            </li>
          ))}
        </ul>
      </div> */}
    </div>
  );
};

export default UploadImages;
