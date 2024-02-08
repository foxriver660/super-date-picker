/* eslint-disable react-hooks/exhaustive-deps */
import  { useRef, useEffect } from "react";
import "./Popup.css";

export const Popup = ({ toggle, children }) => {
  const popupRef = useRef<HTMLDivElement>(null);

  const handleOutsideClick = (e) => {
    if (popupRef.current && !popupRef.current.contains(e.target)) {
      toggle((prev) => !prev);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  return (
    <div ref={popupRef} className="popup popup_show">
      {children}
    </div>
  );
};


