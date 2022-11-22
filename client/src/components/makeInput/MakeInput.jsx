import "./makeInput.scss";
import { carBrands } from "../../data";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";

const MakeInput = ({ make, setMake }) => {
  const [comp, setComp] = useState(carBrands);
  const [showComp, setShowComp] = useState(false);

  const ref = useDetectClickOutside({
    onTriggered: () => {
      setShowComp(false);

      if (!carBrands.find(i => i.toLowerCase() === make)) {
        setMake("");
      }
    },
  });

  const filterComp = value => {
    setShowComp(true);
    setMake(value);
    if (value.trim().length > 1) {
      setComp(carBrands.filter(i => i.toLowerCase().includes(value)));
    } else {
      setComp(carBrands);
    }
  };

  const handleMake = b => {
    setShowComp(false);
    setMake(b.toLowerCase());
  };

  return (
    <div style={{ position: "relative" }} className="info-input">
      <label>Make</label>
      <input
        ref={ref}
        onChange={e => filterComp(e.target.value)}
        onFocus={() => setShowComp(true)}
        type="text"
        placeholder="add Make"
        value={make}
      />
      {showComp && (
        <div className="comp-list">
          {comp?.map(b => (
            <button onClick={() => handleMake(b)} key={b} className="company">
              <span>{b}</span>
              <img
                src={`https://www.carlogos.org/car-logos/${b.toLowerCase()}-logo.png`}
                alt={b}
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default MakeInput;
