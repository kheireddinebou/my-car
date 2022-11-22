import "./sortList.scss";
import { FaSortAmountDown } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

const SortList = ({
  showList,
  setShowList,
  handleSort,
  subList,
  setSubList,
}) => {
  const sortFilter = [
    {
      name: "posted",
      filter: ["oldest", "newest"],
    },
    {
      name: "price",
      filter: ["lowest", "highest"],
    },
    {
      name: "year",
      filter: ["oldest", "latest"],
    },
    {
      name: "mileage",
      filter: ["lowest", "highest"],
    },
  ];

  const handleClose = () => {
    setShowList(false);
    setSubList(null);
  };

  const handleLists = f => {
    setShowList(false);
    setSubList(f);
  };

  return (
    <div>
      {(showList || subList) && (
        <button className="close-btn" onClick={handleClose}>
          <AiOutlineClose />
        </button>
      )}

      {showList && (
        <div className="sort-list">
          <div className="list">
            <span>
              <FaSortAmountDown />
              Sort
            </span>
            {sortFilter.map((f, i) => (
              <span key={i} onClick={() => handleLists(f)}>
                {f.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {subList && (
        <div className="sort-list">
          <div className="list">
            <span>{subList.name}</span>
            {subList.filter.map((f, i) => (
              <span onClick={() => handleSort(subList.name, f)} key={i}>
                {f}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SortList;
