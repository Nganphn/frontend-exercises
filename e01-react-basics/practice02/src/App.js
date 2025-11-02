import "./styles.css";

const names = ["Pekka", "Liisa", "Kirsi", "Kari"];

function App() {
                    // with each name (array element) return a jsx <li> element
  const listNames = names.map((name) => <li key={name}>{name}</li>);
  return <ul>{listNames}</ul>;
}

export default App;

// Learning: an array of raw data can be converted into an array of jsx elements by using .map() method. Each raw item turned into a jsx <li> element (with a unique key). The whole array of jsx <li> elements can be rendered inside a <ul> element to display an unordered list