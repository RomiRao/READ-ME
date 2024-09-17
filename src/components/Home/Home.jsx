import { useNavigate } from "react-router-dom";
import useBooks from "../../hooks/useBooks";

import { Carousel } from "react-responsive-carousel";
import PromotionCard from "./PromotionCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Box, Typography } from "@mui/material";
import GenreCard from "./GenreCard";
import Grid from "@mui/material/Unstable_Grid2";
import Navbar from "../Navbar/Navbar";

import image from "../../assets/promotion/Frame_37.png";

function Home() {
  const { topSellingBooks } = useBooks();
  const navigate = useNavigate();

  const handleDetailClick = (id) => {
    navigate(`/detail/${id}`);
  };

  return (
    <>
      <Navbar />
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
        <PromotionCard img={image} />
        <PromotionCard img={image} />
      </Carousel>
      <Box paddingY={{ xs: 3, md: 5 }} paddingX={{ xs: 4, md: 10 }}>
        <Grid container spacing={3} marginY={4} flexWrap="wrap">
          <Grid xs={12} sm={6} md={4}>
            <GenreCard
              title="Fantasy"
              img="https://i0.wp.com/joncronshaw.com/wp-content/uploads/2023/12/DALL%C2%B7E-2023-12-05-10.05.23-A-majestic-wyvern-soaring-above-a-breathtaking-fantasy-landscape.-The-wyvern-a-large-dragon-like-creature-with-two-legs-and-a-pair-of-large-wings-g.png?fit=1200%2C686&ssl=1"
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <GenreCard
              title="Adventure"
              img="https://i.imgur.com/ROU54z0.jpeg"
            />
          </Grid>
          <Grid xs={12} sm={6} md={4}>
            <GenreCard
              title="Horror"
              img="https://fotografias.larazon.es/clipping/cmsimages02/2021/03/10/32D6AE1D-CAC1-43C8-BD02-E30282A67F64/98.jpg?crop=750,422,x0,y0&width=1900&height=1069&optimize=low&format=webply"
            />
          </Grid>
        </Grid>
        <Box>
          <Typography variant="h4" padding={4} textAlign="center">
            Top Sellers
          </Typography>

          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2} padding={{ xs: 1, md: 4 }}>
              {topSellingBooks.map((book) => (
                <Grid xs={12} sm={6} md={3} key={book.id}>
                  <Box
                    sx={{
                      backgroundImage: `url(${book.cover})`,
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      width: "100%",
                      height: { xs: "400px", sm: "500px", md: "560px" },
                      cursor: "pointer",
                    }}
                    onClick={() => handleDetailClick(book.id)}
                  ></Box>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default Home;
