import { Link } from "react-router-dom";
import { carBrands } from "../../data";
import "./makesList.scss";

const MakesList = ({ showAllMakes }) => {
  return (
    <div className="makesList container">
      {showAllMakes
        ? carBrands.map(b => (
            <Link key={b} to={`/search?make=${b}`} className="brand">
              <img
                src={`https://www.carlogos.org/car-logos/${b.toLowerCase()}-logo.png`}
                alt={b}
              />
              <span className="name">{b}</span>
            </Link>
          ))
        : carBrands.slice(0, 10).map(b => (
            <Link key={b} to={`/search?make=${b}`} className="brand">
              <img
                src={`https://www.carlogos.org/car-logos/${b.toLowerCase()}-logo.png`}
                alt={b}
              />
              <span className="name">{b}</span>
            </Link>
          ))}
    </div>
  );
};

export default MakesList;
