import { useState } from "react";
import "./styles.css";

function App() {
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);
  const [result, setResult] = useState(0);

  function buttonPressed(calc) {
    if (calc === "+") setResult(Number(number1) + Number(number2));
    else if (calc === "-") setResult(Number(number1) - Number(number2));
    else if (calc === "*") setResult(Number(number1) * Number(number2));
    else if (calc === "/") setResult(Number(number1) / Number(number2));
  }

  return (
    <>
      <h1>Calculator</h1>
      <label>Number 1:</label>
      <input
        type="number"
        value={number1}
        onChange={(e) => setNumber1(e.target.value)}
        style={{ textAlign: "right" }}
      />
      <label>Number 2:</label>
      <input
        type="number"
        value={number2}
        onChange={(e) => setNumber2(e.target.value)}
        style={{ textAlign: "right" }}
      />
      <button onClick={() => buttonPressed("+")}>+</button>
      <button onClick={() => buttonPressed("-")}>-</button>
      <button onClick={() => buttonPressed("*")}>*</button>
      <button onClick={() => buttonPressed("/")}>/</button>
      <label>Result:</label>{" "}
      <input readOnly value={result} style={{ textAlign: "right" }} />
    </>
  );
}

export default App;

// Learning: When an operator button is clicked, the click handler receives the operator, then pass it as argument calling the function (buttonPressed). The function chooses the correct operation, computes with the current input states, calls setResult(...), and react re-renders to show the updated result.