import React, { useState } from "react";
import { CREATE_FAQS } from "../../../gqloperations/mutation";
import {
  GET_ALL_FAQCATORIES,
  GET_ALL_FAQS,
} from "../../../gqloperations/queries";
import { useApolloClient, useMutation, useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Box, Card, CardActions, CardContent } from "@mui/material";

const AddFaq = () => {
  const navigate = useNavigate();
  const [faqData, setFaqData] = useState({});
  const [faq, { error, loading }] = useMutation(CREATE_FAQS, {
    onCompleted() {
      navigate("/Admin/viewFaq");
    },
  });

  const { data } = useQuery(GET_ALL_FAQCATORIES);

  if (loading) return <h1>Loading...</h1>;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaqData({
      ...faqData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    faq({
      variables: {
        faqNew: faqData,
      },
      update(cache, { data: { faq } }) {
        const recruit = cache.readQuery({
          query: GET_ALL_FAQS,
        });
        cache.writeQuery({
          query: GET_ALL_FAQS,
          data: {
            faq: [faq, ...recruit.faq],
          },
        });
      },
    });
  };

  return (
    <Box
      component="form"
      noValidate
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 275,
        margin: "0px",
        padding: "20px",
        boxShadow: "2px 1px 9px 2px #888888",
        background: "white",
      }}
    >
      {error && <div className="red card-panel">{error.message}</div>}
      <Card variant="outlined">
        <CardContent>
          <Typography variant="h5" component="div">
            FAQ Category:
          </Typography>
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="faqCategoryId">FAQ Category</InputLabel>

              <Select
                labelId="faqCategoryId"
                id="faqCategoryId"
                name="faqCategoryId"
                label="FAQ Category"
                onChange={handleChange}
              >
                {data?.faqCategory?.map((data) => (
                  <MenuItem value={data._id}>{data.faqCategory}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </Box>
        </CardContent>

        <CardContent>
          <Typography variant="h5" component="div">
            Question:
          </Typography>
          <TextField
            label="Question"
            name="question"
            type="text"
            variant="standard"
            onChange={handleChange}
          />
        </CardContent>

        <CardContent>
          <Typography variant="h5" component="div">
            Answer:
          </Typography>
          <TextField
            label="Answer"
            name="answer"
            type="text"
            variant="standard"
            onChange={handleChange}
          />
        </CardContent>

        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add FAQ
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddFaq;
