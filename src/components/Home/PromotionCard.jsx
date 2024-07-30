import { Box } from "@mui/material";

function PromotionCard() {
  return (
    <>
      <Box
        sx={{
          backgroundImage: `url(https://imgsrv.crunchyroll.com/cdn-cgi/image/fit=contain,format=auto,quality=85,width=1200,height=675/catalog/crunchyroll/a249096c7812deb8c3c2c907173f3774.jpg)`,
          backgroundPosition: "top",
          backgroundSize: "cover",
          width: "100%",
          height: "460px",
        }}
      ></Box>
    </>
  );
}

export default PromotionCard;
