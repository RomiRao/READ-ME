import { Carousel } from "react-responsive-carousel";
import PromotionCard from "./PromotionCard";

function Home() {
  return (
    <>
      <Carousel
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showArrows={false}
        showStatus={false}
      >
        <PromotionCard />
      </Carousel>
    </>
  );
}

export default Home;
