import { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useBooks from "../../hooks/useBooks";
import { CartContext } from "../../context/CartContext";

import Navbar from "../Navbar/Navbar";
import { Box, Button, Slider, Typography } from "@mui/material";
import Grid from "@mui/material/Grid";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { RotatingLines } from "react-loader-spinner";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Footer from "../Footer";

const valuetext = (value) => `${value}$`;

function Filtered() {
  const { fetchBooks, books, genres } = useBooks();
  const navigate = useNavigate();
  const location = useLocation();
  const { addItems } = useContext(CartContext);

  const maxPrice = Math.max(...books.map((book) => book.price));

  const [filters, setFilters] = useState({
    category: [],
    genre: [],
    price: [0, 1000],
    new: null,
  });

  useEffect(() => {
    fetchBooks().catch((error) => console.error("Error loading books:", error));
  }, [filters]);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const genreParam = query.get("genre");

    setFilters((prevFilters) => ({
      ...prevFilters,
      genre: genreParam ? [genreParam] : [],
    }));
  }, [location.search]);

  const handleClick = (id) => {
    navigate(`/detail/${id}`);
  };

  const handleFilterChange = (event) => {
    const { name, value, checked } = event.target;

    if (name === "new") {
      setFilters((prevFilters) => ({
        ...prevFilters,
        new: checked ? value === "true" : null,
      }));
    } else {
      setFilters((prevFilters) => {
        const currentValues = prevFilters[name];
        const newValues = checked
          ? [...currentValues, value]
          : currentValues.filter((item) => item !== value);

        return { ...prevFilters, [name]: newValues };
      });
    }
  };

  const handlePriceChange = (event, newValue) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: newValue,
    }));
  };

  const filteredBooks = useMemo(() => {
    return books.filter((book) => {
      const matchesCategory =
        filters.category.length === 0 ||
        filters.category.includes(book.category);
      const matchesGenre =
        filters.genre.length === 0 ||
        filters.genre.some((g) => book.genre.includes(g));
      const matchesPrice =
        book.price >= filters.price[0] && book.price <= filters.price[1];
      const matchesState = filters.new === null || book.new === filters.new;

      return matchesCategory && matchesGenre && matchesPrice && matchesState;
    });
  }, [books, filters]);

  return (
    <>
      <Navbar />
      <Box paddingY={10} paddingX={{ xs: 1, md: 10 }}>
        <Grid container spacing={3} sx={{ margin: 0, padding: 0 }}>
          {/* Filters Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h4" sx={{ marginBottom: 5 }}>
              Filters
            </Typography>
            <FormGroup sx={{ marginBottom: 5 }}>
              <Typography variant="h6">By category</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    name="category"
                    value="Book"
                    checked={filters.category.includes("Book")}
                    onChange={handleFilterChange}
                    sx={{
                      color: "#3F6059",
                      "&.Mui-checked": { color: "#3F6059" },
                      "&:hover": { backgroundColor: "#e0f2f1" },
                      "&.Mui-checked:hover": { backgroundColor: "#c1e3e0" },
                    }}
                  />
                }
                label="Books"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="category"
                    value="Manga"
                    checked={filters.category.includes("Manga")}
                    onChange={handleFilterChange}
                    sx={{
                      color: "#3F6059",
                      "&.Mui-checked": { color: "#3F6059" },
                      "&:hover": { backgroundColor: "#e0f2f1" },
                      "&.Mui-checked:hover": { backgroundColor: "#c1e3e0" },
                    }}
                  />
                }
                label="Mangas"
              />
            </FormGroup>

            <FormGroup sx={{ marginBottom: 5 }}>
              <Typography variant="h6">By genre</Typography>
              {genres.map((genre) => (
                <FormControlLabel
                  key={genre}
                  control={
                    <Checkbox
                      name="genre"
                      value={genre}
                      checked={filters.genre.includes(genre)}
                      onChange={handleFilterChange}
                      sx={{
                        color: "#3F6059",
                        "&.Mui-checked": { color: "#3F6059" },
                        "&:hover": { backgroundColor: "#e0f2f1" },
                        "&.Mui-checked:hover": { backgroundColor: "#c1e3e0" },
                      }}
                    />
                  }
                  label={genre}
                />
              ))}
            </FormGroup>

            <FormGroup sx={{ marginBottom: 5 }}>
              <Typography variant="h6">By price</Typography>
              <Slider
                value={filters.price}
                onChange={handlePriceChange}
                valueLabelDisplay="auto"
                getAriaValueText={valuetext}
                disableSwap
                max={maxPrice}
                sx={{
                  maxWidth: "200px",
                  "& .MuiSlider-thumb": { bgcolor: "#3F6059" },
                  "& .MuiSlider-track": { bgcolor: "#3F6059" },
                  "& .MuiSlider-rail": { bgcolor: "#3F6059" },
                  "& .MuiSlider-valueLabel": {
                    bgcolor: "#3F6059",
                    color: "#fff",
                  },
                }}
              />
            </FormGroup>

            <FormGroup sx={{ marginBottom: 5 }}>
              <Typography variant="h6">By state</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    name="new"
                    value="true"
                    checked={filters.new === true}
                    onChange={handleFilterChange}
                    sx={{
                      color: "#3F6059",
                      "&.Mui-checked": { color: "#3F6059" },
                      "&:hover": { backgroundColor: "#e0f2f1" },
                      "&.Mui-checked:hover": { backgroundColor: "#c1e3e0" },
                    }}
                  />
                }
                label="New"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    name="new"
                    value="false"
                    checked={filters.new === false}
                    onChange={handleFilterChange}
                    sx={{
                      color: "#3F6059",
                      "&.Mui-checked": { color: "#3F6059" },
                      "&:hover": { backgroundColor: "#e0f2f1" },
                      "&.Mui-checked:hover": { backgroundColor: "#c1e3e0" },
                    }}
                  />
                }
                label="Used"
              />
            </FormGroup>

            <Button
              variant="contained"
              sx={{
                backgroundColor: "#3F6059",
                "&:hover": { backgroundColor: "#2c4946" },
              }}
              onClick={() =>
                setFilters({
                  category: [],
                  genre: [],
                  price: [0, 1000],
                  new: null,
                })
              }
            >
              Reset Filters
            </Button>
          </Grid>

          {/* Books Section */}
          <Grid
            item
            xs={9}
            md={7}
            container
            spacing={3}
            sx={{ margin: 0, padding: 0 }}
          >
            {books.length === 0 ? (
              <Box
                textAlign="center"
                width="100%"
                sx={{ margin: 0, padding: 0 }}
              >
                <RotatingLines
                  visible={true}
                  height="50"
                  width="50"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                />
              </Box>
            ) : filteredBooks.length > 0 ? (
              filteredBooks.map((book) => (
                <Grid
                  item
                  xs={6}
                  sm={4}
                  md={3}
                  key={book.id}
                  sx={{ margin: 0, padding: 0 }}
                >
                  <Box
                    sx={{
                      padding: 0,
                      display: "flex",
                      flexDirection: "column",
                      height: "100%",
                      maxHeight: 470,
                      justifyContent: "space-between",
                      margin: 0,
                    }}
                  >
                    <img
                      src={book.cover}
                      alt={book.name}
                      style={{
                        width: "100%",
                        height: "auto",
                        maxHeight: "200px",
                        objectFit: "cover",
                        cursor: "pointer",
                      }}
                      onClick={() => navigate(`/detail/${book.id}`)}
                    />
                    <Typography variant="caption">{book.author}</Typography>

                    <Typography
                      variant="h6"
                      sx={{
                        cursor: "pointer",

                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "100%",
                      }}
                      onClick={() => handleClick(book.id)}
                    >
                      {book.name}
                    </Typography>

                    <Typography variant="body1">${book.price}</Typography>
                    <Button
                      onClick={(e) => addItems(e, book)}
                      variant="contained"
                      className="add-to-cart-btn"
                      sx={{
                        mt: 2,
                        backgroundColor: "#3F6059",
                        "&:hover": { backgroundColor: "#2c4946" },
                      }}
                      startIcon={<LocalMallIcon />}
                      aria-label={`Add ${book.name} to cart`}
                    >
                      Add to Cart
                    </Button>
                  </Box>
                </Grid>
              ))
            ) : (
              <Typography variant="h6" color="error">
                No books match the selected filters.
              </Typography>
            )}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

export default Filtered;
