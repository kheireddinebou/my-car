import "./hero.scss";

const Hero = () => {
  return (
    <div className="hero">
      <span className="bg-text">MyCar.com</span>
      <div className="left">
        
        <span>Search For Your Dream Car in a matter of seconds.</span>
      </div>
      <div className="right">
        <img
          src="https://www.tdmobiledetailing.com/_nuxt/img/hero-car-mobile.044e46d.png"
          alt="car"
        />
      </div>
    </div>
  );
};

export default Hero;
