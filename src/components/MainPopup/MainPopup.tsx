import { FC } from "react";
import { QuickSelect } from "./QuickSelect/QuickSelect";
import { CommonUsed } from "./CommonUsed/CommonUsed";
import { RecentlyUsed } from "./RecentlyUsed/RecentlyUsed";
import { Divider } from "../../UI/Divider/Divider";
import { useDateContext } from "../../context/context";

export const MainPopup: FC = () => {

  const { choosenRange } = useDateContext();
  
  return (
    <>
      <QuickSelect />
      <Divider />
      <CommonUsed />
      {!!choosenRange.length && (
        <>
          <Divider />
          <RecentlyUsed />
        </>
      )}
    </>
  );
};
