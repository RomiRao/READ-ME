import { useState } from "react";
import { Box, Button, Slider, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

//Slider price value
function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

function Filtered({ books }) {
  //Slider price function
  const [value1, setValue1] = useState([0, 1000]);

  const handleChange1 = (event, newValue, activeThumb) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue1([Math.min(newValue[0], value1[1] - minDistance), value1[1]]);
    } else {
      setValue1([value1[0], Math.max(newValue[1], value1[0] + minDistance)]);
    }
  };

  return (
    <Grid container>
      <Grid xs={3}>
        <Typography variant="h4" sx={{ marginBottom: 5 }}>
          Filters
        </Typography>
        <FormGroup sx={{ marginBottom: 5 }}>
          <Typography variant="h6">By type</Typography>
          <FormControlLabel control={<Checkbox />} label="Libros" />
          <FormControlLabel control={<Checkbox />} label="Audiolibros" />
          <FormControlLabel control={<Checkbox />} label="Mangas" />
        </FormGroup>
        <FormGroup sx={{ marginBottom: 5 }}>
          <Typography variant="h6">By genre</Typography>
          <FormControlLabel control={<Checkbox />} label="Accion" />
          <FormControlLabel control={<Checkbox />} label="Aventura" />
          <FormControlLabel control={<Checkbox />} label="Terror" />
        </FormGroup>
        <FormGroup sx={{ marginBottom: 5 }}>
          <Typography variant="h6">By price</Typography>
          <Slider
            getAriaLabel={() => "Minimum distance"}
            value={value1}
            onChange={handleChange1}
            valueLabelDisplay="auto"
            getAriaValueText={valuetext}
            disableSwap
            max={1000}
            sx={{ maxWidth: "200px" }}
          />
        </FormGroup>
        <FormGroup variant="h6" sx={{ marginBottom: 5 }}>
          <Typography>By state</Typography>
          <FormControlLabel control={<Checkbox />} label="Nuevo" />
          <FormControlLabel control={<Checkbox />} label="Usado" />
        </FormGroup>
        <Button variant="contained">Search</Button>
      </Grid>

      {/* Books display */}
      <Grid xs={9} container spacing={3}>
        {books.map((book) => (
          <Grid xs={3} padding={3}>
            <Box
              component="img"
              sx={{
                maxWidth: "200px",
                maxHeight: "250px",
                boxShadow: "-3px 11px 16px -6px rgba(0,0,0,0.75)",
              }}
              alt={`${book.name}`}
              src={`${book.cover}`}
            />
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default Filtered;
