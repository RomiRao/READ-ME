import { useContext, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useBooks from "../hooks/useBooks";
import { CartContext } from "../context/CartContext";

import Navbar from "./Navbar/Navbar";
import { Box, Button, Slider, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { RotatingLines } from "react-loader-spinner";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import Footer from "./Footer";

const valuetext = (value) => `${value}$`;

function Filtered() {
  const { fetchBooks, books, genres } = useBooks(); // Usar fetchBooks en lugar de obtData
  const navigate = useNavigate();
  const location = useLocation();
  const { addItems } = useContext(CartContext);

  const [filters, setFilters] = useState({
    category: [],
    genre: [],
    price: [0, 1000],
    new: null,
  });

  useEffect(() => {
    fetchBooks().catch((error) => console.error("Error loading books:", error));
  }, [filters, fetchBooks]); // Añadir fetchBooks a las dependencias

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

  const filteredBooks = books.filter((book) => {
    const matchesCategory =
      filters.category.length === 0 || filters.category.includes(book.category);
    const matchesGenre =
      filters.genre.length === 0 ||
      filters.genre.some((g) => book.genre.includes(g));
    const matchesPrice =
      book.price >= filters.price[0] && book.price <= filters.price[1];
    const matchesState = filters.new === null || book.new === filters.new;

    return matchesCategory && matchesGenre && matchesPrice && matchesState;
  });

  return (
    <>
      <Navbar />
      <Box paddingY={10} paddingX={10}>
        <Grid container>
          <Grid xs={3}>
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
                      color: "#3F6059", // Color of the checkbox border
                      "&.Mui-checked": {
                        color: "#3F6059", // Color of the checkbox when checked
                      },
                      "&:hover": {
                        backgroundColor: "#e0f2f1", // Light background color on hover
                      },
                      "&.Mui-checked:hover": {
                        backgroundColor: "#c1e3e0", // Slightly darker hover color when checked
                      },
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
                      color: "#3F6059", // Color of the checkbox border
                      "&.Mui-checked": {
                        color: "#3F6059", // Color of the checkbox when checked
                      },
                      "&:hover": {
                        backgroundColor: "#e0f2f1", // Light background color on hover
                      },
                      "&.Mui-checked:hover": {
                        backgroundColor: "#c1e3e0", // Slightly darker hover color when checked
                      },
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
                        color: "#3F6059", // Color of the checkbox border
                        "&.Mui-checked": {
                          color: "#3F6059", // Color of the checkbox when checked
                        },
                        "&:hover": {
                          backgroundColor: "#e0f2f1", // Light background color on hover
                        },
                        "&.Mui-checked:hover": {
                          backgroundColor: "#c1e3e0", // Slightly darker hover color when checked
                        },
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
                max={1000}
                sx={{
                  maxWidth: "200px",
                  "& .MuiSlider-thumb": {
                    bgcolor: "#3F6059",
                  },
                  "& .MuiSlider-track": {
                    bgcolor: "#3F6059",
                  },
                  "& .MuiSlider-rail": {
                    bgcolor: "#3F6059",
                  },
                  "& .MuiSlider-valueLabel": {
                    bgcolor: "#3F6059",
                    color: "#fff",
                  },
                }}
              />
            </FormGroup>
            <FormGroup variant="h6" sx={{ marginBottom: 5 }}>
              <Typography>By state</Typography>
              <FormControlLabel
                control={
                  <Checkbox
                    name="new"
                    value="true"
                    checked={filters.new === true}
                    onChange={handleFilterChange}
                    sx={{
                      color: "#3F6059", // Color of the checkbox border
                      "&.Mui-checked": {
                        color: "#3F6059", // Color of the checkbox when checked
                      },
                      "&:hover": {
                        backgroundColor: "#e0f2f1", // Light background color on hover
                      },
                      "&.Mui-checked:hover": {
                        backgroundColor: "#c1e3e0", // Slightly darker hover color when checked
                      },
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
                      color: "#3F6059", // Color of the checkbox border
                      "&.Mui-checked": {
                        color: "#3F6059", // Color of the checkbox when checked
                      },
                      "&:hover": {
                        backgroundColor: "#e0f2f1", // Light background color on hover
                      },
                      "&.Mui-checked:hover": {
                        backgroundColor: "#c1e3e0", // Slightly darker hover color when checked
                      },
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
                "&:hover": {
                  backgroundColor: "#2c4946",
                },
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

          <Grid xs={9} container spacing={3}>
            {books.length === 0 ? (
              <Box>
                <RotatingLines
                  visible={true}
                  height="50"
                  width="50"
                  color="grey"
                  strokeWidth="5"
                  animationDuration="0.75"
                  ariaLabel="rotating-lines-loading"
                />
                <Typography>Loading books...</Typography>
              </Box>
            ) : (
              filteredBooks.map((book) => (
                <Grid
                  key={book.id}
                  xs={3}
                  display="flex"
                  flexDirection="column"
                  paddingX={5}
                  justifyContent="space-between"
                  maxHeight="450px"
                >
                  <Box
                    component="img"
                    sx={{
                      maxWidth: "170px",
                      maxHeight: "250px",
                      boxShadow: "-3px 11px 16px -6px rgba(0,0,0,0.75)",
                      cursor: "pointer",
                      marginBottom: 2,
                      alignSelf: "center",
                    }}
                    alt={book.name}
                    src={book.cover}
                    onClick={() => handleClick(book.id)}
                  />
                  <Typography
                    variant="caption"
                    textAlign="center"
                    marginBottom={1}
                  >
                    {book.author}
                  </Typography>
                  <Typography>{book.name}</Typography>
                  <Typography
                    sx={{
                      marginBottom: 2,
                      color: "#3F6059",
                      fontWeight: 600,
                    }}
                  >
                    ${book.price}
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<LocalMallIcon />}
                    sx={{
                      backgroundColor: "#3F6059",
                      "&:hover": {
                        backgroundColor: "#2c4946",
                      },
                    }}
                    onClick={(e) => addItems(e, book)}
                  >
                    ADD TO CART
                  </Button>
                </Grid>
              ))
            )}
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </>
  );
}

export default Filtered;
