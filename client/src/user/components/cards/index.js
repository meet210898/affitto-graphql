import { NavLink } from "react-router-dom";
import { Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";

const Cards = ({ img, linkName, name }) => {
  return (
    <Grid
      md={3}
      sx={{
        position: "relative",
      }}
    >
      <NavLink to={`/user/${linkName}`}>
        <Card style={{ borderRadius: "12px" }}>
          <CardMedia component="img" height="140" image={img} alt={name} />
          <Typography
            variant="h5"
            component="h2"
            sx={{
              position: "absolute",
              bottom: "1%",
              width: "50%",
              textAlign: "left",
              color: "white",
              fontSize: "20px",
              fontFamily: "Sans-serif",
            }}
          >
            {name}
          </Typography>
        </Card>
      </NavLink>
    </Grid>
  );
};

export default Cards;
