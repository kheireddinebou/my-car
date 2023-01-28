import { useEffect } from "react";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { FaSortAmountDown } from "react-icons/fa";
import SortList from "../sortList/SortList";
import "./sortBar.scss";

const SortBar = ({ cars, setFiltredCars, setFilter }) => {
  const [showList, setShowList] = useState(false);
  const [subList, setSubList] = useState(null);
  const [filterType, setFilterType] = useState(null);

  const handleSort = (type, value) => {
    setShowList(false);
    setFilterType(type);
    let filtredCars;

    if (type === "posted") {
      if (value === "oldest") {
        filtredCars = cars.sort(
          (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt)
        );
      } else if (value === "newest") {
        filtredCars = cars.sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
      }
    } else if (type === "price") {
      if (value === "lowest") {
        filtredCars = cars.sort((a, b) => a.price - b.price);
      } else if (value === "highest") {
        filtredCars = cars.sort((a, b) => b.price - a.price);
      }
    } else if (type === "year") {
      if (value === "oldest") {
        filtredCars = cars.sort((a, b) => a.year - b.year);
      } else if (value === "latest") {
        filtredCars = cars.sort((a, b) => b.year - a.year);
      }
    } else if (type === "mileage") {
      if (value === "lowest") {
        filtredCars = cars.sort((a, b) => a.mileage - b.mileage);
      } else if (value === "highest") {
        filtredCars = cars.sort((a, b) => b.mileage - a.mileage);
      }
    }

    setSubList(null);
    setFilter(true);
    setFiltredCars(filtredCars);
  };

  useEffect(() => {
    setFilter(false);
  }, [handleSort]);

  return (
    <>
      <div className="SortBar">
        <button onClick={() => setShowList(true)}>
          <FaSortAmountDown />
          {filterType ? filterType : "Sort"}
        </button>
        <span>
          <strong>{cars.length}</strong>{" "}
          {cars.length === 1 ? "vehicle" : "vehicles"}
        </span>
      </div>
      <SortList
        subList={subList}
        setSubList={setSubList}
        showList={showList}
        setShowList={setShowList}
        handleSort={handleSort}
      />
    </>
  );
};

export default SortBar;
