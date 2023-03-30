import React from "react";
import { useMutation } from "@apollo/client";
import { DELETE_CITIES } from "../../../gqloperations/mutation";
import { GET_ALL_CITIES } from "../../../gqloperations/queries";

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

  const handleClose = () => setConfirmDialog(false);

  const [deleteCity] = useMutation(DELETE_CITIES);

  const deleteHandler = () => {
    deleteCity({
      variables: {
        deleteId: {
          _id: id,
        },
      },
      update(cache, { data: { city } }) {
        const recruit = cache.readQuery({
          query: GET_ALL_CITIES,
        });
        const newCityArr = recruit.city.filter((data) => data._id !== city._id);
        cache.writeQuery({
          query: GET_ALL_CITIES,
          data: {
            city: [...newCityArr],
          },
        });
      },
    });
    handleClose();
  };

  return (
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
  );
};

export default DeleteFaq;
