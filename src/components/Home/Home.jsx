import { Carousel } from "react-responsive-carousel";
import PromotionCard from "./PromotionCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box } from "@mui/material";
import GenreCard from "./GenreCard";
import Grid from "@mui/material/Grid";

function Home() {
  return (
    <Box paddingY={5} paddingX={8}>
      <Carousel
        emulateTouch
        swipeable
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showArrows
        showStatus={false}
      >
        <PromotionCard />
        <PromotionCard />
      </Carousel>
      <Grid container spacing={3}>
        <Grid item xs>
          <GenreCard />
        </Grid>
        <Grid item xs>
          <GenreCard />
        </Grid>
        <Grid item xs>
          <GenreCard />
        </Grid>
      </Grid>
    </Box>
  );
}

export default Home;
