import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const PrivacyModal = () => {
  const [open, setOpen] = useState(false);

  const policyText = (
    <div>
        <h1 style={{color: "black", textAlign: "center"}}>Privacy Policy</h1>
    <p style={{color: "black"}}>YODA respects your privacy and is committed to protecting any personal information you provide while using our website. We collect minimal personal information for the purpose of improving user experience and providing relevant content.

    Information Collection: We may collect basic information such as your name and email address when you subscribe to our newsletter or participate in promotions.
    
    Data Usage: Any personal information collected is used solely for communication purposes and to enhance your experience on our website. We do not share your information with third parties unless required by law.
    
    Data Security: We implement reasonable security measures to protect your personal information from unauthorized access or disclosure.
    
    Cookie Usage: We use cookies to improve website functionality and track user interactions. You can disable cookies in your browser settings if you prefer.
    
    By using YODA, you consent to our privacy policy. We reserve the right to update this policy as necessary.
    </p>
    </div>
  );

  return (
    <>
      <button className="item1" onClick={() => setOpen(true)}>
        Privacy Policy
      </button>
      <Modal open={open} onClose={() => setOpen(false)} center>
        <h2>Privacy Policy</h2>
        {policyText}
        
      </Modal>
    </>
  );
};

export default PrivacyModal;
