import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const DeleteModal = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { confirmDialog, setConfirmDialog, id, deleteItem } = props;

  const handleClose = () => {
    setConfirmDialog(false);
  };

  const deleteHandler = () => {
    deleteItem({
      variables: {
        deleteId: {
          _id: id,
        },
      },
    });
    handleClose();
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={confirmDialog.isOpen}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {confirmDialog.title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>{confirmDialog.subTitle}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            style={{ background: "#FCE3E7" }}
            variant="contained"
            onClick={handleClose}
          >
            <b style={{ margin: "0px", color: "black" }}>No</b>
          </Button>
          <Button
            variant="contained"
            style={{ background: "red" }}
            onClick={deleteHandler}
          >
            <b style={{ margin: "0px" }}>Yes</b>
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DeleteModal;
