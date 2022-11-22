import { Link } from "react-router-dom";
import "./bodyTypeList.scss";

const bodyTips = [
  {
    name: "coupe",
    img: "https://sayartii.com/static/img/car-types-2/coupe.svg",
  },
  {
    name: "sedan",
    img: "https://sayartii.com/static/img/car-types-2/sedan.svg",
  },
  {
    name: "suv",
    img: "https://sayartii.com/static/img/car-types-2/suv.svg",
  },
  {
    name: "hatch",
    img: "https://sayartii.com/static/img/car-types-2/hatch.svg",
  },
  {
    name: "wagon",
    img: "https://sayartii.com/static/img/car-types-2/wagon.svg",
  },
  {
    name: "pickup",
    img: "https://sayartii.com/static/img/car-types-2/pickup.svg",
  },
  {
    name: "minivan",
    img: "https://sayartii.com/static/img/car-types-2/minivan.svg",
  },
  {
    name: "commercial",
    img: "https://sayartii.com/static/img/car-types-2/commercial.svg",
  },
  {
    name: "other",
    img: "https://sayartii.com/static/img/car-types-2/other.svg",
  },
];

const BodyTypeList = () => {
  return (
    <div className="bodyTypeList container">
      {bodyTips.map(b => (
        <Link
          key={b.img}
          to={`/search?bodyType=${b.name}`}
          className="bodyType"
        >
          <img src={b.img} alt={b.name} />
          <span className="name">{b.name}</span>
        </Link>
      ))}
    </div>
  );
};

export default BodyTypeList;
