import { FC } from "react";
import { QuickSelect } from "./QuickSelect/QuickSelect";
import { CommonUsed } from "./CommonUsed/CommonUsed";
import { RecentlyUsed } from "./RecentlyUsed/RecentlyUsed";
import { Divider } from "../../UI";
import { useDateContext } from "../../context";

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
