import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { updatePassword } from "firebase/auth";
import { auth } from "../auth/firebase";

export const ChangePassword: React.FC = () => {
  const user = auth.currentUser;

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const formData = new FormData(event.currentTarget);
            const formJson = Object.fromEntries(Array.from(formData.entries()));
            const password = formJson.password;
            const confirmPassword = formJson.confirmPassword;

            if (password !== confirmPassword)
              return console.log("Passwords do not match");
            if (password) {
              if (user) {
                updatePassword(user, password as string)
                  .then(() => {
                    console.log("Password updated successfully");
                  })
                  .catch((error: Error) => {
                    console.error("Error updating password:", error);
                  });
              }
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Change password</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter new password.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="password"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="standard"
          />
          <TextField
            autoFocus
            required
            margin="dense"
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm"
            type="password"
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button type="submit">OK</Button>
        </DialogActions>
      </Dialog>
    </>
  );
};
