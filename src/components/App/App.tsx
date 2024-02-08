import { DataPicker } from "../DataPicker/DataPicker";
import { DateProvider } from "../../context/context";

function App() {
  return (
    <DateProvider>
      <DataPicker selectedRange={(data) => console.log()} />
    </DateProvider>
  );
}

export default App;
