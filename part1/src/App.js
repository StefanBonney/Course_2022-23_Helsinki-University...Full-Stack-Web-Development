import React from "react"


const Hello = (props) => {
  return (
    <div>
      <p> Hello {props.name}, you are {props.age} years old</p>
    </div>
  )
}

const App = () => {
  const nimi = 'Pekka'
  const ika = 10

  return (
    <div>
      <p> Greetings</p>
      <Hello name="maya" age={26 + 10} />
      <Hello name="test3" age={ika} />
    </div>
  )
}

export default App