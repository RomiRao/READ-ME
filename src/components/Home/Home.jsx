import { Carousel } from "react-responsive-carousel";
import PromotionCard from "./PromotionCard";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Home() {
  return (
    <>
      <Carousel
        emulateTouch
        swipeable
        autoPlay
        infiniteLoop
        interval={3000}
        showThumbs={false}
        showArrows
        showStatus={false}
      >
        <PromotionCard />
        <PromotionCard />
      </Carousel>
    </>
  );
}

export default Home;
