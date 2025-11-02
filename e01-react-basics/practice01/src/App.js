import "./styles.css";

function Movie(props) {
  return (
    <div className="movieCard">
      <p>{props.title}</p>
      <p>{props.sali}</p>
      <p>{props.time}</p>
    </div>
  );
}

function App() {
  return (
    <>
      <div className="list">
        <Movie title="Frozen 2" sali="Tennispalatsi - sali 1" time="10:30" />
        <Movie title="Joker" sali="Tennispalatsi - sali 2" time="12:30" />
        <Movie title="Terminator" sali="Tennispalatsi - sali 3" time="14:30" />
      </div>
    </>
  );
}

export default App;

// Learning: With function properties, the function can be reused multiple times