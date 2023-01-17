import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useDispatch } from "react-redux";
import { restoreUser } from "../../actions/index";

export default function AlertDialog({open,handleClose,input}) {
    const {email,password} =input;
    const dispatch = useDispatch();

    async function handleSubmit(event) {
        event.preventDefault();
        try {
          dispatch(restoreUser(email,password));
        } catch (error) {
          console.log("el error es:", error);
        }
      }
    return (
      <div>
        <Dialog
            open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {"Alerta"}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
            El usuario habia sido borrado. 
            Esta seguro de querer recuperar su cuenta?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>No</Button>
            <Button onClick={(event) => handleSubmit(event)}>
              Si
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }