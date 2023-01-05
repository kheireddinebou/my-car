import "./imagesSlider.scss";
import { MdClose, MdArrowRight, MdArrowLeft } from "react-icons/md";

const ImagesSlider = ({
  images,
  sliderIndex,
  setSliderIndex,
  setShowSlider,
}) => {
  const handleChange = direction => {
    if (direction === "left") {
      setSliderIndex(sliderIndex === 0 ? images.length - 1 : sliderIndex - 1);
    } else {
      setSliderIndex(sliderIndex === images.length - 1 ? 0 : sliderIndex + 1);
    }
  };
  return (
    <div className="imagesSlider">
      <button className="closeBtn" onClick={() => setShowSlider(false)}>
        <MdClose />
      </button>
      <button className="arrow left" onClick={() => handleChange("left")}>
        <MdArrowLeft />
      </button>
      <img src={images[sliderIndex]} alt="" />
      <button className="arrow right" onClick={() => handleChange("right")}>
        <MdArrowRight />
      </button>
    </div>
  );
};

export default ImagesSlider;
