import React, { useState } from "react";
import ExistingImageGallery from "./ExistingImageGallery";
import { useAppSelector } from "../../hooks/useAppDispatch";
import axios from "axios";

interface UploadPictureProps {
  existingImages: string[];
}

const UploadPicture: React.FC<UploadPictureProps> = ({ existingImages }) => {
  const uid = useAppSelector((state) => state.uid.uid);
  const token = useAppSelector((state) => state.token.token);

  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files?.[0];

    setSelectedBackground(URL.createObjectURL(file));

    // upload image to database
    const formData = new FormData();

    formData.append("image", file);
    formData.append("uid", uid);

    axios
      .post(`http://localhost:8000/storage/images`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          // Send token in request headers
          "x-access-token": token,
        },
      })
      .then((response) => {
        console.log(`image`, response.data);
      })
      .catch(() => {
        console.log(
          `Error uploading image: Login to upload. UID and / or token required. `
        );
      });
  };

  const handleBackgroundSelect = (backgroundUrl: string) => {
    setSelectedBackground(backgroundUrl);
  };

  return (
    <div>
      <label htmlFor="upload">Upload Image:</label>
      <input
        id="upload"
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        aria-labelledby="upload-label"
      />

      <div>
        <h3>Select backgrounds:</h3>
        <ExistingImageGallery
          existingImages={existingImages}
          onImageSelect={handleBackgroundSelect}
        />
      </div>

      {selectedBackground && (
        <div style={{ marginTop: "20px" }}>
          <h3>Selected Background:</h3>
          <img
            src={selectedBackground}
            alt="Selected Background"
            style={{ maxWidth: "100%" }}
          />
        </div>
      )}
    </div>
  );
};

export default UploadPicture;
