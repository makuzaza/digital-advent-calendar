import React, { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

interface PrivacyModalProps {
    // Define any props here if needed
}

const PrivacyModal: React.FC<PrivacyModalProps> = (props) => {
    const [open, setOpen] = useState<boolean>(false);

    const policyText = (
        <p style={{color: "black"}}>
            our privacy policy
        </p>
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
