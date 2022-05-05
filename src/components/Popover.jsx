import { MdOutlineInvertColorsOff } from "react-icons/md";

import { TypeColors, defaultColor } from "../constants";

const Popover = ({ bgColor, handleSelectColor }) => {
  return (
    <div className="Popover">
      <button className="btn-icon" onClick={() => handleSelectColor(defaultColor)}>
        <MdOutlineInvertColorsOff />
      </button>
      {TypeColors.map((item, index) => (
        <div
          key={index}
          className={`popover-color` + (bgColor === item.bgColor ? " active__color" : "")}
          style={{ background: item.bgColor }}
          onClick={() => handleSelectColor(item)}
        />
      ))}
    </div>
  );
};

export { Popover };
