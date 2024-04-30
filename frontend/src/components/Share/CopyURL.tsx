import { Button } from "@mui/material";
import { useState } from "react";

const ShareButton: React.FC = () => {
  const [message, setMessage] = useState<string>("Copy URL");
  const handleShare = () => {
    navigator.clipboard
      .writeText(window.location.href)
      .then(() => setMessage("URL copied"))
      .catch((err) => console.error("Failed to copy URL: ", err));
  };

  return (
    <Button onClick={handleShare} variant="contained" color="primary">
      {message}
    </Button>
  );
};

export default ShareButton;
