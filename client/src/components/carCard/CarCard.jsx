import "./carCard.scss";

const CarCard = ({ car }) => {
  return (
    <div className="carCard">
      <div className="thumbnail">
        <img src={car.images[car.img]} alt={car.title} />
      </div>

      <span className="name">
        {car.year} {car.make} {car.model}
      </span>
      <span className="details">
        <span className="km">
          <strong>{car.mileage.toLocaleString()}</strong> km. {car.desc?.slice(0, 20)}....
        </span>
        <span className="price">{car.price.toLocaleString()}$</span>
      </span>
    </div>
  );
};

export default CarCard;
