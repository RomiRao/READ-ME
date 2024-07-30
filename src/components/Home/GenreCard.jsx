import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

export default function GenreCard() {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="h5" component="div" padding={2}>
          Fantasy
        </Typography>
        <Box
          component="img"
          sx={{
            width: "100%",
          }}
          alt="The house from the offer."
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&w=350&dpr=2"
        />
      </CardContent>
      <Grid container spacing={2} padding={2}>
        <Grid xs>
          <Box
            component="img"
            sx={{
              width: "100%",
            }}
            alt="The house from the offer."
            src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
          />
        </Grid>
        <Grid xs>
          <Box
            component="img"
            sx={{
              width: "100%",
            }}
            alt="The house from the offer."
            src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
          />
        </Grid>
        <Grid xs>
          <Box
            component="img"
            sx={{
              width: "100%",
            }}
            alt="The house from the offer."
            src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
          />
        </Grid>
        <Grid xs>
          <Box
            component="img"
            sx={{
              width: "100%",
            }}
            alt="The house from the offer."
            src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
          />
        </Grid>
      </Grid>
    </Card>
  );
}
