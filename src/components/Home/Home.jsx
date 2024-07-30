import { Carousel } from "react-responsive-carousel";
import PromotionCard from "./PromotionCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Typography } from "@mui/material";
import GenreCard from "./GenreCard";
import Grid from "@mui/material/Grid";

function Home() {
  return (
    <>
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
      <Grid container spacing={3} marginY={4}>
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
      <Box>
        <Typography variant="h4" padding={4} textAlign={"center"}>
          Top Sellers
        </Typography>

        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} columns={20} padding={4}>
            <Grid xs={5} padding={3}>
              <Box
                component="img"
                sx={{
                  maxWidth: "270px",
                }}
                alt="The house from the offer."
                src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
              />
            </Grid>
            <Grid xs={5} padding={3}>
              <Box
                component="img"
                sx={{
                  maxWidth: "270px",
                }}
                alt="The house from the offer."
                src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
              />
            </Grid>
            <Grid xs={5} padding={3}>
              <Box
                component="img"
                sx={{
                  maxWidth: "270px",
                }}
                alt="The house from the offer."
                src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
              />
            </Grid>
            <Grid xs={5} padding={3}>
              <Box
                component="img"
                sx={{
                  maxWidth: "270px",
                }}
                alt="The house from the offer."
                src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
              />
            </Grid>
            <Grid xs={5} padding={3}>
              <Box
                component="img"
                sx={{
                  maxWidth: "270px",
                }}
                alt="The house from the offer."
                src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
              />
            </Grid>
            <Grid xs={5} padding={3}>
              <Box
                component="img"
                sx={{
                  maxWidth: "270px",
                }}
                alt="The house from the offer."
                src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
              />
            </Grid>
            <Grid xs={5} padding={3}>
              <Box
                component="img"
                sx={{
                  maxWidth: "270px",
                }}
                alt="The house from the offer."
                src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
              />
            </Grid>
            <Grid xs={5} padding={3}>
              <Box
                component="img"
                sx={{
                  maxWidth: "270px",
                }}
                alt="The house from the offer."
                src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Home;
