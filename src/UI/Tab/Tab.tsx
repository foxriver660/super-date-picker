import { useCallback, FC, ReactNode } from "react";
import "./tab.css";

interface ITabProps {
  active: boolean;
  value: string;
  children: ReactNode;
  onClick: (arg: string) => void;
}

export const Tab: FC<ITabProps> = ({ active, value, children, onClick }) => {
  const className = `tab ${active ? "tab_type_current" : ""} `;

  const handleClick = useCallback(() => {
    if (typeof onClick === "function") {
      onClick(value);
    }
  }, [onClick, value]);

  return (
    <div className={className} onClick={handleClick}>
      <span className="text text_type_main-default">{children}</span>
    </div>
  );
};

