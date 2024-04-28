import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useState } from "react";
import { updateProfile } from "firebase/auth";
import { auth } from "../auth/firebase";

type Props = {
  setUserName: React.Dispatch<React.SetStateAction<string | null>>;
};

export const ChangeUsername: React.FC<Props> = ({ setUserName }) => {
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
        Change username
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
            const username = formJson.username;
            if (username) {
              if (user) {
                updateProfile(user, {
                  displayName: username as string,
                })
                  .then(() => {
                    setUserName(username as string);
                    console.log("User name updated successfully");
                  })
                  .catch((error: Error) => {
                    console.error("Error updating user name:", error);
                  });
              } else {
                console.error("No user signed in");
              }
            }
            handleClose();
          },
        }}
      >
        <DialogTitle>Change username</DialogTitle>
        <DialogContent>
          <DialogContentText>Enter new username.</DialogContentText>
          <TextField
            autoFocus
            required
            margin="dense"
            id="username"
            name="username"
            label="Username"
            type="text"
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
