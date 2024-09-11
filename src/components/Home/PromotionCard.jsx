import { Box } from "@mui/material";

function PromotionCard({ img }) {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(${img})`,
          backgroundPosition: "center",
          backgroundSize: "cover",
          width: "100%",
          height: "460px",
        }}
      />
    </>
  );
}

export default PromotionCard;
