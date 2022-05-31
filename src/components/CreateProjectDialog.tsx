import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import AddIcon from "@mui/icons-material/Add";
import { useTheme } from "@mui/material/styles";
export default function AlertDialog({ children, onSubmit }: any) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="contained"
        color={theme.palette.mode === "dark" ? "primary" : "myAwesomeColor"}
        onClick={handleClickOpen}
        startIcon={<AddIcon />}
        sx={{ color: "white" }}
      >
        New Project
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Create new project"}
        </DialogTitle>
        <DialogContent>
          {children}
          {/* <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText> */}
        </DialogContent>
        <DialogActions sx={{ display: "block", textAlign: "center" }}>
          <div onClick={handleClose}>
            <Button
              onClick={onSubmit}
              sx={{ widht: "100%" }}
              variant="contained"
              color={
                theme.palette.mode === "dark" ? "primary" : "myAwesomeColor"
              }
            >
              Create new project
            </Button>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
}
