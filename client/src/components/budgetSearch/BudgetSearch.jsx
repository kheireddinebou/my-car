import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./budgetSearch.scss";

const BudgetSearch = () => {
  const budget = useRef();
  const navigate = useNavigate();

  const handleSearch = e => {
    e.preventDefault();
    navigate(`/search?budget=${budget.current.value}`);
  };
  return (
    <div className="budgetSearch">
      <span className="search-title">Great cars for every budget</span>
      <form onSubmit={handleSearch}>
        <input
          ref={budget}
          type="number"
          min="0"
          placeholder="Your Car budget, USD"
          step="100"
        />
        <button type="submit">Surprise Me</button>
      </form>
    </div>
  );
};

export default BudgetSearch;
