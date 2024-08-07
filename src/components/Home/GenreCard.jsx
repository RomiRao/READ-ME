import { useEffect } from "react";
import useBooks from "../../hooks/useBooks";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";

import CardContent from "@mui/material/CardContent";

import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

export default function GenreCard({ title, img }) {
  const { filterBooks, books } = useBooks();

  useEffect(() => {
    filterBooks(title);
  }, [title]);

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="h5" component="div" padding={2}>
          {title}
        </Typography>
        <Box
          component="img"
          sx={{
            width: "100%",
          }}
          alt="Section cover"
          src={img}
        />
      </CardContent>
      <Grid container spacing={2} padding={2}>
        {books.slice(0, 4).map((book, index) => (
          <Grid item xs sm={6} md={3} key={index}>
            <Box
              component="img"
              sx={{
                width: "100%",
                height: 130,
              }}
              alt={book.name}
              src={book.cover}
            />
          </Grid>
        ))}
      </Grid>
    </Card>
  );
}
