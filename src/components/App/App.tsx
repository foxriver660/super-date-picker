import { DataPicker } from "../DataPicker/DataPicker";
import { DateProvider } from "../../context/context";

function App() {
  return (
    <DateProvider>
      <DataPicker selectedRange={(dates) => console.log(dates)} />
    </DateProvider>
  );
}

export default App;
