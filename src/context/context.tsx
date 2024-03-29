import React, { createContext, useState } from "react";

export interface IDates {
  startDate: Date;
  endDate: Date;
}
export interface IDateContextProps {
  choosenRange: string[];
  choosenFormatedDate: IDates;
  isUpdate: boolean;
  addUniqueRange: React.Dispatch<React.SetStateAction<string>>;
  setChoosenRange: React.Dispatch<React.SetStateAction<string[]>>;
  setChoosenFormatedDate: React.Dispatch<React.SetStateAction<IDates>>;
  setIsUpdate: React.Dispatch<React.SetStateAction<boolean>>;
}

export const DateContext = createContext<IDateContextProps | undefined>(undefined);

export const DateProvider = ({ children }: { children: React.ReactNode }) => {
  const [choosenRange, setChoosenRange] = useState<string[]>([]);
  const [choosenFormatedDate, setChoosenFormatedDate] = useState<IDates>({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [isUpdate, setIsUpdate] = useState(false);
  const addUniqueRange = (str) => {
    setChoosenRange((prevRange) => {
      const updatedRange = prevRange.filter((item) => item !== str);
      return [str, ...updatedRange];
    });
  };

  const contextValue: IDateContextProps = {
    choosenRange,
    isUpdate,
    choosenFormatedDate,
    addUniqueRange,
    setIsUpdate,
    setChoosenRange,
    setChoosenFormatedDate,
  };

  return (
    <DateContext.Provider value={contextValue}>{children}</DateContext.Provider>
  );
};


