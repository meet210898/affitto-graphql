import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { UPDATE_FAQ_CATEGORIES } from "../../../gqloperations/mutation";
import { GET_ALL_FAQCATORIES } from "../../../gqloperations/queries";

import { Box, Typography, Modal } from "@mui/material";
import { Button, TextField } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  height: "auto",
  overflow: "scroll",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const ModalCall = ({ open, setOpen, editData }) => {
  const [faqCategoryData, setFaqCategoryData] = useState("");

  const [updateFaqCategory] = useMutation(UPDATE_FAQ_CATEGORIES);

  useEffect(() => {
    if (editData) {
      setFaqCategoryData(editData);
    }
  }, [editData]);

  const handleSubmit = (event) => {
    event.preventDefault();

    updateFaqCategory({
      variables: {
        faqCategoryUpdate: {
          _id: editData._id,
          faqCategory: faqCategoryData,
        },
      },
      update(cache, { data: { faqCategory } }) {
        const recruit = cache.readQuery({
          query: GET_ALL_FAQCATORIES,
        });
        let faqCategoryArr = [...recruit.faqCategory];
        const updateFaqIndex = faqCategoryArr.findIndex(
          (data) => data._id === faqCategory._id
        );
        faqCategoryArr.splice(updateFaqIndex, 1, faqCategory);
        cache.writeQuery({
          query: GET_ALL_FAQCATORIES,
          data: {
            faq: [...faqCategoryArr],
          },
        });
      },
    });
    handleClose();
  };

  const handleClose = () => setOpen(false);
  return (
    <Modal
      open={open}
      onClose={handleClose}
      onSubmit={handleSubmit}
      component="form"
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField
            label="FAQ Category"
            name="faqCategory"
            type="text"
            variant="standard"
            defaultValue={editData && editData.faqCategory}
            onChange={(e) => setFaqCategoryData(e.target.value)}
          />
        </Typography>

        <div>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <Button type="submit" variant="contained" size="medium">
              Update
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Button
              type="submit"
              onClick={handleClose}
              variant="contained"
              size="medium"
            >
              Close
            </Button>
          </Typography>
        </div>
      </Box>
    </Modal>
  );
};

export default ModalCall;
