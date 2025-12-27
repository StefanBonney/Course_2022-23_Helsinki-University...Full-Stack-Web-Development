import { useState, useEffect } from 'react';
import personService from './services/persons'



//===========================================================[Filter]
const FilterField = ({ filterValue, onChange }) => (
  <div>
    filter shown with: <input value={filterValue} onChange={onChange} />
  </div>
);

//===========================================================[PersonForm]
const PersonForm = ({ onSubmit, nameValue, numberValue, onChangeName, onChangeNumber }) => (
  <form onSubmit={onSubmit}>
    <div>name: <input value={nameValue} onChange={onChangeName} /></div>
    <div>number: <input value={numberValue} onChange={onChangeNumber} /></div>
    <div><button type="submit">add</button></div>
  </form>
);

//===========================================================[PersonsList]
const PersonsList = ({ persons, onDelete }) => (
  <ul style={{ listStyle: 'none', padding: 0 }}>
    {persons.map(person => (
      <li key={person.name}>
        {person.name} {person.number}
        <button onClick={() => onDelete(person.id, person.name)}>delete</button>
      </li>
    ))}
  </ul>
);

//===========================================================[App]
const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [newFilter, setNewFilter] = useState('');

  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, []) // empty makes run only once after first render

  const handleNameChange = (event) => {setNewName(event.target.value)}
  const handleNumberChange = (event) => {setNewNumber(event.target.value)}
  const handleFilterChange = (event) => {setNewFilter(event.target.value)}


  const addPerson = (event) => {
    event.preventDefault()
    const existingPerson = persons.find(person => person.name === newName)
      if (existingPerson) {
        alert(`${newName} is already added to phonebook`)
        return
      }
    const newPerson = { 
      name: newName, 
      number: newNumber 
    }
    // debug: state after update (form-submission)
    //console.log('new person:', newPerson)
    //console.log('new persons list:', [...persons, newPerson])
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
    })
  }

  const filterPersons = (persons, filter) => {
    if (!filter) 
      return persons
    return persons.filter(person => 
      person.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  const deletePerson = (id, name) => {
    //console.log('deletePerson called with:', { id, name })
    if (window.confirm(`Delete ${name}?`)) {
      personService
        .remove(id)
        .then(() => {
          //console.log('Server deleted person, updating state')
          setPersons(persons.filter(person => person.id !== id))
          //console.log('State updated, re-render component')
        })
    }
  }

  //###########################################################################################[RETURN]
  return (
    <div>
      <h2>Phonebook</h2>
      <FilterField filterValue={newFilter} onChange={handleFilterChange} /> 
      <h2>add a new</h2>
      <PersonForm onSubmit={addPerson} nameValue={newName} numberValue={newNumber} onChangeName={handleNameChange} onChangeNumber={handleNumberChange} />
      <h2>Numbers</h2>
      <PersonsList persons={filterPersons(persons,newFilter)}  onDelete={deletePerson} />
    </div>
  )

}

export default App
