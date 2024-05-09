import React from "react";
import ExistingImageGallery from "./ExistingImageGallery";
import { useAppSelector } from "../../hooks/useAppDispatch";
import axios from "axios";

interface UploadPictureProps {
  setSelectedBackground: (backgroundUrl: string) => void;
  selectedBackground: string;
  setUploadedImageName: (name: string) => void;
}

const UploadPicture: React.FC<UploadPictureProps> = ({
  setSelectedBackground,
  selectedBackground,
  setUploadedImageName,
}) => {
  const uid = useAppSelector((state) => state.uid.uid);
  const token = useAppSelector((state) => state.token.token);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files) return;

    const file = event.target.files?.[0];

    setSelectedBackground(URL.createObjectURL(file));

    setUploadedImageName(file.name);

    // upload image to database
    const formData = new FormData();

    formData.append("image", file);
    formData.append("uid", uid);

    axios
      .post(`https://caas-deploy.onrender.com/storage/images`, formData, {
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
          setSelectedBackground={setSelectedBackground}
          selectedBackground={selectedBackground}
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
