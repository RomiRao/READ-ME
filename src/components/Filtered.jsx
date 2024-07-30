import { Box, Container } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";

function Filtered() {
  return (
    <Container>
      <Box>
        <FormGroup>
          <FormControlLabel
            control={<Checkbox defaultChecked />}
            label="Label"
          />
          <FormControlLabel required control={<Checkbox />} label="Required" />
          <FormControlLabel disabled control={<Checkbox />} label="Disabled" />
        </FormGroup>
      </Box>
      <Grid container spacing={3}>
        <Grid xs={3} padding={3}>
          <Box
            component="img"
            sx={{
              maxWidth: "270px",
            }}
            alt="The house from the offer."
            src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
          />
        </Grid>
        <Grid xs={3} padding={3}>
          <Box
            component="img"
            sx={{
              maxWidth: "270px",
            }}
            alt="The house from the offer."
            src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
          />
        </Grid>
        <Grid xs={3} padding={3}>
          <Box
            component="img"
            sx={{
              maxWidth: "270px",
            }}
            alt="The house from the offer."
            src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
          />
        </Grid>
        <Grid xs={3} padding={3}>
          <Box
            component="img"
            sx={{
              maxWidth: "270px",
            }}
            alt="The house from the offer."
            src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
          />
        </Grid>
        <Grid xs={3} padding={3}>
          <Box
            component="img"
            sx={{
              maxWidth: "270px",
            }}
            alt="The house from the offer."
            src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
          />
        </Grid>
        <Grid xs={3} padding={3}>
          <Box
            component="img"
            sx={{
              maxWidth: "270px",
            }}
            alt="The house from the offer."
            src="https://acdn.mitiendanube.com/stores/399/159/products/onepiece011-778bcfffc7d1f6acd115684066763694-640-0.jpg"
          />
        </Grid>
        <Grid xs={3} padding={3}>
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
    </Container>
  );
}

export default Filtered;
