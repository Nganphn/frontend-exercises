import { useState } from "react";
import "./Practice03.css";

function Practice03App() {
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

export default Practice03App;
