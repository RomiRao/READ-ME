import { Box } from "@mui/material";

function PromotionCard() {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(https://s1.elespanol.com/2023/09/01/series/netflix/791181272_235731526_1024x576.jpg)`,
          backgroundPosition: "top",
          backgroundSize: "cover",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
          alignItems: "center",
          width: "100%",
          height: "460px",
        }}
      ></Box>
    </>
  );
}

export default PromotionCard;
