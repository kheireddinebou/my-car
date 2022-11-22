import CarsList from "../../components/carsList/CarsList";
import Navbar from "../../components/navbar/Navbar";
import SellBtn from "../../components/sellBtn/SellBtn";
import "./search.scss";

const Search = () => {
  return (
    <>
      <Navbar />

      <div className="search-page">
        <SellBtn />
        <CarsList />
      </div>
    </>
  );
};

export default Search;
