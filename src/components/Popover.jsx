import { MdOutlineInvertColorsOff } from "react-icons/md";

import { TypeColors, defaultColor } from "../constants";

import "../styles/Popover.scss";

const Popover = ({ bgColor, handleSelectColor }) => {
  return (
    <div className="container-Popover">
      <button
        className="container-Popover-btn-not-color"
        onClick={() => handleSelectColor(defaultColor)}
      >
        <MdOutlineInvertColorsOff />
      </button>
      {TypeColors.map((item, index) => (
        <div
          key={index}
          className={`Popover-color` + (bgColor === item.bgColor ? " active" : "")}
          style={{ background: item.bgColor }}
          onClick={() => handleSelectColor(item)}
        />
      ))}
    </div>
  );
};

export { Popover };
