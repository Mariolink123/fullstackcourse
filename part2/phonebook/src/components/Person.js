const Person = ({ person, deletePerson }) => {

    return (
      <>
        {person.name} {person.number} <button onClick={deletePerson}>delete</button>
        <br></br>
      </>
    )
  }
  

  export default Person