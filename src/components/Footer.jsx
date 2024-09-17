import * as React from "react";
import { Box, Typography, IconButton } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

const Footer = () => {
  const handleIconClick = (url) => {
    window.open(url, "_blank");
  };

  return (
    <Box
      component="footer"
      sx={{
        width: "100%",
        padding: 2,
        backgroundColor: "#f5f5f5",
        borderTop: "1px solid #e0e0e0",
        textAlign: "center",
      }}
    >
      <Typography variant="body2" color="text.secondary">
        © {new Date().getFullYear()} Example Ecommerce
      </Typography>
      <Box sx={{ mt: 1 }}>
        <IconButton
          onClick={() =>
            handleIconClick("https://www.linkedin.com/in/romina-rao-50a61a1ba/")
          }
        >
          <LinkedInIcon />
        </IconButton>
        <IconButton
          onClick={() => handleIconClick("https://github.com/RomiRao")}
        >
          <GitHubIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Footer;
