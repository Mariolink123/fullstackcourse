import { useState, useEffect } from 'react'

import Person from './components/Person'
import Notification from './components/Notification'
import personService from './services/persons'



const App = () => {
  const [persons, setPersons] = useState([])  
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filterName, setNewFilter] = useState('')
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const notify = (message, type='info') => {
    setNotification({ message, type })
    setTimeout(() => {
      setNotification(null)
    }, 3000)
  }

  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1,
    }
    console.log(personObject.id)
    const isDuplicate = persons.some(person => person.name === newName)
    if (isDuplicate) {
      const dupeID = persons.find(person => person.name === newName).id
      personObject.id = dupeID
      updateNumber(personObject)
      return
    }

    personService
      .create(personObject)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        notify (
          `Added ${newName}`
        )
      }).catch(error => {
        notify(
          `${error.response.data.error}`, 'alert'
        )
      })
  }

  const deletePerson = (id) => {
    const personToDelete = persons.find(p => p.id ===id)
    window.confirm(`Do you want to delete ${personToDelete.name}`)
    personService
      .remove(id)
      .then(() => {
        setPersons(persons.filter(p => p.id !== id))
      })
      .catch(error => {
        alert (
          `the person '${personToDelete.name}' was already deleted from the server`
        )
        setPersons(persons.filter(p => p.id !== id))
      })
  
  }

  const updateNumber = (personToUpdate) => {
    const id = personToUpdate.id
    const name = personToUpdate.name

    if (!window.confirm(`${name} is already added to the phonebook. Do you want to update their number?`)) {
      return
    }
    
    personService
      .update(id, personToUpdate)
      .then(returnedPerson => {
        setPersons(persons.map(person => person.id !== id ? person : returnedPerson ))
        setNewName('')
        setNewNumber('')
        notify (
          `Changed ${newName}'s number to ${personToUpdate.number}`
        )
      })
      .catch(error => {
        notify (
         `${error.response.data.error}`, 'alert'
        )
        setPersons(persons.filter(p => p.id !== id))
      })
  }
  

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }



  const peopleToShow = persons.filter(person =>
    person.name.toLowerCase().includes(filterName.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter filterName={filterName} handleFilterChange={handleFilterChange}></Filter>
      <h2>add a new person</h2>
      <PersonForm addPerson={addPerson} handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange} newName={newName} newNumber={newNumber}>
      </PersonForm>
      <h2>Numbers</h2>
      <Persons peopleToShow={peopleToShow} deletePerson={deletePerson}></Persons>
    </div>
  )
}


const Persons = ({ peopleToShow, deletePerson }) => {

  return (
    <>
      {peopleToShow.map(person =>
        <Person key={person.id} person={person} deletePerson={() => deletePerson(person.id)} />
      )}
    </>
  )
}

const Filter = ({ filterName, handleFilterChange }) => {

  return (
    <>
      search for: <input value={filterName} onChange={handleFilterChange} />
    </>
  )
}

const PersonForm = ({ addPerson, handleNameChange, handleNumberChange, newName, newNumber }) => {

  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

export default App