import "./home.scss";
import { Link } from "react-router-dom";
import BudgetSearch from "../../components/budgetSearch/BudgetSearch";
import Hero from "../../components/hero/Hero";
import Navbar from "../../components/navbar/Navbar";
import CarsList from "../../components/carsList/CarsList";
import { useState, useEffect } from "react";
import MakesList from "../../components/makesList/MakesList";
import Footer from "../../components/footer/Footer";
import SellBtn from "../../components/sellBtn/SellBtn";
import BodyTipeList from "../../components/bodyTypeList/BodyTypeList";

const Home = () => {
  const [showAllMakes, setShowAllMakes] = useState(false);

  return (
    <div className="home">
      <SellBtn />
      <Navbar />
      <Hero />
      <BudgetSearch />

      <div className="title container">
        <span>Body Tipe</span>
      </div>

      <BodyTipeList />

      <div className="title container">
        <span>Makes</span>
        <Link onClick={() => setShowAllMakes(!showAllMakes)}>
          {showAllMakes ? "hide" : "see all"}
        </Link>
      </div>

      <MakesList showAllMakes={showAllMakes} />

      <div className="title container">
        <span>Latest Cars</span>
        <Link to="/search?all=true">View ALl</Link>
      </div>
      <CarsList />

      <Link className="viewall-btn" to="/search?all=true">
        View All
      </Link>

      <Footer />
    </div>
  );
};

export default Home;
