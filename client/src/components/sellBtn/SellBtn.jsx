import "./sellBtn.scss";
import { useState, useEffect, useContext } from "react";
import { ShowSellContext } from "../../context/showSellContext/showSellContext";
import SellForm from "../../pages/sellForm/SellForm";
import { CurrentUserContext } from "../../context/currentUserContext/currentUserContext";
import { ShowAuthContext } from "../../context/showAuthContext/showAuthContext";

const SellBtn = () => {
  const [showSellBtn, setShowSellBtn] = useState(true);
  const { currentUser } = useContext(CurrentUserContext);
  const { setShowLogin } = useContext(ShowAuthContext);
  const { showSellForm, setShowSellForm } = useContext(ShowSellContext);

  useEffect(() => {
    const onScroll = () => {
      if (window.pageYOffset > 500) {
        setShowSellBtn(false);
      } else {
        setShowSellBtn(true);
      }
    };
    // clean up code
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {showSellForm && <SellForm />}
      <button
        onClick={() =>
          currentUser ? setShowSellForm(true) : setShowLogin(true)
        }
        className={`sell-btn ${showSellBtn ? "show" : ""}`}
      >
        Sell
      </button>
    </>
  );
};

export default SellBtn;
