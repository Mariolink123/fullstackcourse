import { useState } from 'react'

const StatisticLine = ( {text, value} ) => {

  return (
  <div>
    <p>{text} {value}</p>
  </div>
  )
}

const Button = ( {onClick, text} ) => {
  return (
    <button onClick={onClick}>
      {text}
    </button>
  )
}

const Statistics = ( {good, neutral, bad, all} ) => {
  const average = ((good) + (bad) * -1 ) / (all)
  const positivePercentage = ( (good) / (all)) * 100
  if (all === 0) {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  return (
    <div>
    <h1>statistics</h1>
    <table cellSpacing="0">
      <tbody>
    <tr>
      <td><StatisticLine text="good" /></td>
      <td><StatisticLine value={good}/></td>
    </tr>
    <tr>
      <td><StatisticLine text="bad"/></td>
      <td><StatisticLine  value={bad}/></td>
      
    </tr>
    <tr>
      <td><StatisticLine text="neutral"/></td>
      <td><StatisticLine  value={neutral}/></td>
    </tr>
    <tr>
      <td><StatisticLine text="all"/></td>
      <td><StatisticLine  value={all}/></td>
    </tr>
    <tr>
      <td> <StatisticLine text="average"/></td>
      <td> <StatisticLine  value={average}/></td>
    </tr>
    <tr>
      <td><StatisticLine text=" percentage  "/></td>
      <td><StatisticLine value={positivePercentage + " %"}/></td>
    </tr>
    </tbody>
    </table>
    </div>
  )

}

const App = () => {

  
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    setGood(good + 1)
  }

  const handleBadClick = () => {
    setBad(bad + 1)
  }

  const handleNeutralClick = () => {
    setNeutral(neutral + 1)
  }


  return (
    <div>
      <h1>feedback</h1>
      <Button onClick={handleGoodClick} text="good"/>
      <Button onClick={handleNeutralClick} text="neutral"/>
      <Button onClick={handleBadClick} text="bad"/>

  <Statistics good={good} neutral={neutral} bad={bad} all={good + bad + neutral} />
    </div>
  )
}

export default App