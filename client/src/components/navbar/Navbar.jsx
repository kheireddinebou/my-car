import "./navbar.scss";
import { MdKeyboardArrowDown } from "react-icons/md";
import { BsSearch } from "react-icons/bs";
import { FaIdCard } from "react-icons/fa";
import { useContext, useState } from "react";
import { carBrands } from "../../data";
import { Link, useNavigate } from "react-router-dom";
import { useDetectClickOutside } from "react-detect-click-outside";
import { ShowAuthContext } from "../../context/showAuthContext/showAuthContext";
import Login from "../../pages/login/Login";
import Register from "../../pages/register/Register";
import Settings from "../../pages/settings/Settings";
import { useRef } from "react";
import { CurrentUserContext } from "../../context/currentUserContext/currentUserContext";
import { ShowEditContext } from "../../context/showEditContext copy/showEditContext ";

const Navbar = () => {
  const [showComp, setShowComp] = useState(false);
  const [comp, setComp] = useState(carBrands);
  const [showSearch, setShowSearch] = useState(false);
  const [showSett, setShowSett] = useState(false);
  const [searchText, setSearchText] = useState("");
  const { showLogin, setShowLogin, showRegister } = useContext(ShowAuthContext);
  const { currentUser, setCurrentUser } = useContext(CurrentUserContext);

  const navigate = useNavigate();

  const filterComp = e => {
    const { value } = e.target;
    setSearchText(value);
    if (value.trim().length > 1) {
      setComp(carBrands.filter(i => i.toLowerCase().includes(value)));
    } else {
      setComp(carBrands);
    }
  };

  const handleSearch = e => {
    e.preventDefault();
    navigate(`/search?text=${searchText}`);
  };

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setShowSearch(false);
      setShowComp(false);
    },
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      setShowSearch(false);
    }
  });

  return (
    <div className="navbar">
      {showLogin && <Login />}
      {showRegister && <Register />}
      {currentUser && (
        <Settings showSett={showSett} setShowSett={setShowSett} />
      )}

      <div className="container wrapper">
        <div className={`left ${showSearch ? "show" : ""}`}>
          <Link to="/">
            <h1>MyCar</h1>
          </Link>
        </div>
        <div ref={ref} className="center">
          {/* search for mobile */}

          <BsSearch
            onClick={() => {
              setShowComp(true);
              setShowSearch(true);
            }}
            className="search-icon"
          />
          <div className={`search ${showSearch ? "show" : ""}`}>
            <form onSubmit={handleSearch} style={{ width: "100%" }}>
              <input
                value={searchText}
                onChange={e => filterComp(e)}
                onFocus={() => setShowComp(true)}
                type="text"
                placeholder="Seach for car...."
              />
            </form>
            <button
              className={`${showComp ? "show" : ""}`}
              onClick={() => setShowComp(!showComp)}
            >
              <MdKeyboardArrowDown />
            </button>

            {showComp && (
              <div className="comp-list">
                {comp.map(b => (
                  <Link
                    onClick={() => setShowComp(false)}
                    key={b}
                    to={`/search?make=${b}`}
                    className="company"
                  >
                    <span>{b}</span>
                    <img
                      src={`https://www.carlogos.org/car-logos/${b.toLowerCase()}-logo.png`}
                      alt={b}
                    />
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {currentUser ? (
          <div className={`right ${showSearch ? "show" : ""}`}>
            <button onClick={() => setShowSett(true)}>
              <FaIdCard />
              Profile
            </button>
          </div>
        ) : (
          <div className={`right ${showSearch ? "show" : ""}`}>
            <button onClick={() => setShowLogin(true)}>Login</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
