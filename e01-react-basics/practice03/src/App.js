import { useState } from "react";
import "./styles.css";

function App() {
  const [value, setValue] = useState(0);

  return (
    <div className="counter">
      <p className="counterValue">Value is {value}</p>
      <div className="controls">
        <button className="btn btnInc" onClick={() => setValue(value + 1)}>
          increase
        </button>
        <button className="btn btnDec" onClick={() => setValue(value - 1)}>
          decrease
        </button>
      </div>
    </div>
  );
}

export default App;

// Learning: With SetState, the UI shows values from state and updates when state changes. When there is an event (button clicked), the event handler calls the corresponding setter (setValue). The app component is re-rendered, and the value is updated, then the new value is displayed immediately.