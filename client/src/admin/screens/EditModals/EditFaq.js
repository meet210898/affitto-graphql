import React, { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import {
  GET_ALL_FAQCATORIES,
  GET_ALL_FAQS,
} from "../../../gqloperations/queries";
import { UPDATE_FAQS } from "../../../gqloperations/mutation";

import { Box, Typography, Modal } from "@mui/material";
import {
  Button,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import TextareaAutosize from "@mui/material/TextareaAutosize";

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
  const [faqData, setFaqData] = useState({
    question: "",
    answer: "",
  });

  useEffect(() => {
    if (editData) {
      setFaqData(editData);
    }
  }, [editData]);

  const { error, data, loading } = useQuery(GET_ALL_FAQCATORIES);
  const [updateFaq] = useMutation(UPDATE_FAQS, {
    onCompleted: (data) => console.log("updated faq data==", data),
    refetchQueries: [GET_ALL_FAQS, "faqCategory"],
  });

  if (loading) return <h1>Loading...</h1>;
  if (error) {
    console.log("error", error);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("faqData.faqCategoryId._id", faqData);
    updateFaq({
      variables: {
        faqUpdate: {
          _id: editData._id,
          faqCategoryId:
            faqData.faqCategoryId !== editData.faqCategoryId
              ? faqData.faqCategoryId
              : faqData.faqCategoryId._id,
          question: faqData.question,
          answer: faqData.answer,
        },
      },
    });
    handleClose();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaqData({
      ...faqData,
      [name]: value,
    });
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
        <Box sx={{ minWidth: 120 }}>
          <FormControl fullWidth>
            <InputLabel id="faqCategoryId">Vehicle Type</InputLabel>

            <Select
              labelId="faqCategoryId"
              id="faqCategoryId"
              name="faqCategoryId"
              label="FAQ Category"
              defaultValue={editData && editData.faqCategoryId._id}
              onChange={handleChange}
            >
              {data?.faqCategory
                ?.slice(0)
                .reverse()
                .map((data) => (
                  <MenuItem value={data._id}>{data.faqCategory}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextField
            label="Question"
            name="question"
            type="text"
            variant="standard"
            defaultValue={editData && editData.question}
            onChange={handleChange}
          />
        </Typography>

        <Typography id="modal-modal-title" variant="h6" component="h2">
          <TextareaAutosize
            aria-label="answer"
            minRows={5}
            name="answer"
            placeholder="Minimum 3 rows"
            style={{ width: "100%", marginTop: "15px" }}
            onChange={handleChange}
            defaultValue={editData && editData.answer}
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
