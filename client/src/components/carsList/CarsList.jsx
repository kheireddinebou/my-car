import CarCard from "../carCard/CarCard";
import "./carsList.scss";
import { Link, useLocation, useParams } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import { publicRequest } from "../../requestMethods";
import SortBar from "../sortBar/SortBar";
import { TailSpin } from "react-loader-spinner";

const CarsList = () => {
  const [cars, setCars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filtredCars, setFiltredCars] = useState(null);
  const [filter, setFilter] = useState(false);
  const { search, pathname } = useLocation();
  const query = search && search.split("?")[1].split("=")[0];
  const queryValue = search && search.split("?")[1].split("=")[1];

  const getData = async () => {
    try {
      setIsLoading(true);
      let res;
      if (query === "all") {
        res = await publicRequest.get("car");
      } else if (query === "make") {
        res = await publicRequest.get(`car?make=${queryValue.toLowerCase()}`);
      } else if (query === "bodyType") {
        res = await publicRequest.get(
          `car?bodyType=${queryValue.toLowerCase()}`
        );
      } else if (query === "budget") {
        res = await publicRequest.get(`car?budget=${queryValue}`);
      } else if (query === "text") {
        res = await publicRequest.get(
          `car?search=${queryValue.toLocaleLowerCase()}`
        );
      } else {
        res = await publicRequest.get("car?new=true");
      }
      setCars(res.data);
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, [search]);

  return (
    <>
      {isLoading ? (
        <TailSpin
          height="60"
          width="60"
          color="gray"
          ariaLabel="tail-spin-loading"
          wrapperStyle={{
            margin: "80px auto",
            width: "fit-content",
          }}
          radius="1"
          visible={true}
        />
      ) : (
        <div className="carsList container">
          {cars.length > 0 ? (
            filter ? (
              filtredCars?.map(c => (
                <Link key={c._id} to={`/car/${c._id}`}>
                  <CarCard car={c} />
                </Link>
              ))
            ) : (
              cars?.map(c => (
                <Link key={c._id} to={`/car/${c._id}`}>
                  <CarCard car={c} />
                </Link>
              ))
            )
          ) : (
            <p className="no-result">OOPS, NO RESULTS MATCHING YOUR SEARCH</p>
          )}
        </div>
      )}

      {pathname === "/search" && (
        <SortBar
          setFiltredCars={setFiltredCars}
          setFilter={setFilter}
          filter={filter}
          cars={cars}
        />
      )}
    </>
  );
};

export default CarsList;
