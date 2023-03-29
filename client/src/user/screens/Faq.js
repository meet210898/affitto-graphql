import React from "react";
import Topbar from "../components/Topbar";
import Grid from "@mui/material/Grid";
import Footer from "../components/footer";
import { useQuery } from "@apollo/client";
import { GET_ALL_FAQCATORIES, GET_ALL_FAQS } from "../../gqloperations/queries";

import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const Faq = () => {
  const faqInfo = useQuery(GET_ALL_FAQS);
  const faqCategoryInfo = useQuery(GET_ALL_FAQCATORIES);

  if (faqInfo.loading || faqCategoryInfo.loading) return <h1>Loading...</h1>;
  if (faqInfo.error || faqCategoryInfo.error) {
    console.log("error");
  }

  return (
    <>
      <Topbar />
      <Grid container marginTop="20px">
        <Grid md={2} xs={1}></Grid>
        <Grid md={8} xs={10}>
          <>
            {faqCategoryInfo?.data?.faqCategory?.map((item) => (
              <>
                <h3>{item.faqCategory}</h3>
                {faqInfo?.data?.faq
                  ?.filter((data) => item._id === data.faqCategoryId._id)
                  .map((data) => (
                    <Accordion>
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id={data._id}
                        style={{
                          padding: "10px",
                          backgroundColor: "#f1f1f1",
                        }}
                      >
                        <Typography
                          style={{ fontSize: "13px", fontWeight: "bold" }}
                        >
                          {data.question}
                        </Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography
                          style={{ fontSize: "13px", color: "#7f868e" }}
                        >
                          {data.answer}
                        </Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
              </>
            ))}
          </>
        </Grid>
        <Grid md={2} xs={1}></Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default Faq;
