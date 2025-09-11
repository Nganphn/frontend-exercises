import Person from "./Person.jsx";

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

function Practice05App() {
  return (
    <div>
      {persons.map((p) => (
        <Person key={p.image} person={p} />
      ))}
    </div>
  );
}

export default Practice05App;
