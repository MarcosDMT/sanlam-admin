import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import Button from '@mui/material/Button';
import { TextField } from "@mui/material";
import MKButton from "../../../components/@mui-components/button";

const AddRole = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <IconButton variant="contained" color="primary" onClick={handleClickOpen}>
        <AddIcon />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Add User Roles"}
        </DialogTitle>
        <DialogContent>
              <TextField style={{marginTop: '8px',marginBottom:"8px"}} fullWidth maxWidth="sm" label="Name" />
              <TextField style={{marginTop: '8px',marginBottom:"8px"}} fullWidth maxWidth="sm" label="Name" />
              <TextField style={{marginTop: '8px',marginBottom:"8px"}} fullWidth maxWidth="sm" label="Name" />
        </DialogContent>
        <DialogActions>
          <MKButton color="primary" onClick={handleClose} autoFocus>
            Save
          </MKButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddRole;
