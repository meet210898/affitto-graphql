import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_FAQS } from "../../../gqloperations/mutation";
import { GET_ALL_FAQS } from "../../../gqloperations/queries";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const DeleteFaq = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const { confirmDialog, setConfirmDialog, id } = props;

  const handleClose = () => {
    setConfirmDialog(false);
  };
  const [deleteFaq] = useMutation(DELETE_FAQS, {
    onCompleted: (data) => console.log("deleted faq data==", data),
  });

  const deleteHandler = () => {
    deleteFaq({
      variables: {
        deleteId: {
          _id: id,
        },
      },
      update(cache, { data: { faq } }) {
        const recruit = cache.readQuery({
          query: GET_ALL_FAQS,
        });
        const newFaqArr = recruit.faq.filter((data) => data._id !== faq._id);
        cache.writeQuery({
          query: GET_ALL_FAQS,
          data: {
            faq: [...newFaqArr],
          },
        });
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

export default DeleteFaq;
