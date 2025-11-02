function Person({ person }) {
  return (
    <div>
      <img src={person.image} alt={person.name} />
      <p>{person.name}</p>
    </div>
  );
}

export default Person;