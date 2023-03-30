import React from "react";
import { CREATE_FAQ_CATEGORIES } from "../../../gqloperations/mutation";
import { GET_ALL_FAQCATORIES } from "../../../gqloperations/queries";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { Button, TextField } from "@mui/material";
import { Box, Card, CardActions, CardContent } from "@mui/material";

const AddFaqCategory = () => {
  const navigate = useNavigate();

  const [faqCategoryData, setFaqCategoryData] = React.useState({});
  const [createFaqCategory, { error, loading }] = useMutation(
    CREATE_FAQ_CATEGORIES,
    {
      onCompleted() {
        navigate("/Admin/viewFaqCategory");
      },
    }
  );

  if (loading) return <h1>Loading...</h1>;

  const handleChange = (e) => {
    setFaqCategoryData({
      ...faqCategoryData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    createFaqCategory({
      variables: {
        faqCategoryNew: faqCategoryData,
      },
      update(cache, { data: { faqCategory } }) {
        const recruit = cache.readQuery({
          query: GET_ALL_FAQCATORIES,
        });
        cache.writeQuery({
          query: GET_ALL_FAQCATORIES,
          data: {
            faqCategory: [faqCategory, ...recruit.faqCategory],
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
          <TextField
            label="FAQ Category"
            name="faqCategory"
            type="text"
            variant="standard"
            onChange={(e) => handleChange(e)}
          />
        </CardContent>

        <CardActions>
          <Button type="submit" variant="contained" size="medium">
            Add FAQ Category
          </Button>
        </CardActions>
      </Card>
    </Box>
  );
};

export default AddFaqCategory;
