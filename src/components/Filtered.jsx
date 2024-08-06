import { Box, Button, Container, Slider, Typography } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { useState } from "react";

function valuetext(value) {
  return `${value}°C`;
}

const minDistance = 10;

function Filtered({ books }) {
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

      <Grid xs={9} container spacing={3}>
        <Grid xs={3} padding={3}>
          <Box
            component="img"
            sx={{
              maxWidth: "200px",
            }}
            alt="The house from the offer."
            src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
          />
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Filtered;
