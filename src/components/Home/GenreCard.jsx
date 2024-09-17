import { useEffect } from "react";
import useBooks from "../../hooks/useBooks";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Unstable_Grid2";

export default function GenreCard({ title, img }) {
  const { filterBooks, books } = useBooks();
  const navigate = useNavigate();

  useEffect(() => {
    filterBooks("genre", title);
  }, [title]);

  const handleDetailClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleGenreClick = (genre) => {
    navigate(`/Search?genre=${genre}`);
  };

  return (
    <Card sx={{ width: "100%" }}>
      <CardContent sx={{ padding: 0 }}>
        <Typography variant="h5" component="div" padding={2}>
          {title}
        </Typography>
        <Box
          component="img"
          sx={{
            width: "100%",
            cursor: "pointer",
            height: { xs: 150, sm: 200, md: 250 },
          }}
          alt="Section cover"
          src={img}
          onClick={() => handleGenreClick(title)}
        />
      </CardContent>
      <Grid container spacing={2} padding={2} flexWrap="nowrap">
        {books.slice(0, 4).map((book, index) => (
          <Grid
            xs={12}
            sm={6}
            md={3}
            key={index}
            sx={{ cursor: "pointer" }}
            onClick={() => handleDetailClick(book.id)}
          >
            <Box
              component="img"
              sx={{
                width: "100%",
                height: { xs: 100, md: 130 },
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
