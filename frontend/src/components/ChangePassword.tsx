import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { auth } from "../auth/firebase";
import Swal from "sweetalert2";

export const ChangePassword: React.FC = () => {
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentPassword("");
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        Change password
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperProps={{
          component: "form",
          onSubmit: async (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(Array.from(formData.entries()));
            const newPassword = formJson.password as string;
            const confirmPassword = formJson.confirmPassword as string;

            if (!currentPassword) {
              Swal.fire("Error", "Please enter your current password", "error");
              return;
            }

            if (newPassword !== confirmPassword) {
              Swal.fire("Error", "New passwords do not match", "error");
              return;
            }

            if (newPassword.length < 6) {
              Swal.fire("Error", "Password must be at least 6 characters", "error");
              return;
            }

            try {
              if (user && user.email) {
                // Step 1: Reauthenticate with current password
                const credential = EmailAuthProvider.credential(user.email, currentPassword);
                await reauthenticateWithCredential(user, credential);

                // Step 2: Update password
                await updatePassword(user, newPassword);

                Swal.fire("Success", "Password updated successfully", "success");
                handleClose();
              }
            } catch (error: any) {
              if (error.code === "auth/wrong-password") {
                Swal.fire("Error", "Current password is incorrect", "error");
              } else if (error.code === "auth/weak-password") {
                Swal.fire("Error", "New password is too weak", "error");
              } else {
                Swal.fire("Error", `Error: ${error.message}`, "error");
              }
              // console.error("Error updating password:", error);
            }
          },
        }}
      >
        <DialogTitle>Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter your current password and new password.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="currentPassword"
            name="currentPassword"
            label="Current Password"
            type="password"
            fullWidth
            variant="standard"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <TextField
            required
            margin="dense"
            id="password"
            name="password"
            label="New Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            required
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm New Password"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">Change Password</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};