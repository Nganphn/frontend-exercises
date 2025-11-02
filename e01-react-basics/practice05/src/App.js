import Person from "./Person.js";

const persons = [
  {
    name: "Kirsi Kernel",
    image: "https://randomuser.me/api/portraits/women/31.jpg",
  },
  {
    name: "Matti Mainio",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Matti Merkusson",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
  },
];

function App() {
  return (
    <div>
      {persons.map((p) => (
        <Person key={p.image} person={p} />
      ))}
    </div>
  );
}

export default App;

// Learning: A component can be imported from another file and reused by passing data through props. Using .map(), to transfer an array into an array of jsx <Person /> elements and render it directly (each with a unique key), so the list UI is generated from data.