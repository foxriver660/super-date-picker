import { useContext } from "react";
import { DateContext, IDateContextProps } from "./context";

export const useDateContext = (): IDateContextProps => {
    const context = useContext(DateContext);
    if (!context) {
      throw new Error("Ошибка");
    }
    return context;
  };