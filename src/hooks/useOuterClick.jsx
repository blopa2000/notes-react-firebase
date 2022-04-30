import { useEffect } from "react";

export const useOuterClick = (onOuterClick, innerRef) => {
  useEffect(() => {
    if (innerRef.current) {
      document.addEventListener("click", handleClick);
    }

    return () => document.removeEventListener("click", handleClick);

    function handleClick(e) {
      if (innerRef.current && !innerRef.current.contains(e.target)) {
        onOuterClick();
      }
    }
  }, [onOuterClick, innerRef]);
};
