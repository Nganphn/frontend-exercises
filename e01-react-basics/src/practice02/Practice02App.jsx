import "./Practice02.css";

const names = ["Pekka", "Liisa", "Kirsi", "Kari"];

function Practice02App() {
  const listNames = names.map((name) => <li key={name}>{name}</li>);
  return <ul>{listNames}</ul>;
}

export default Practice02App;
