import React from "react";
import Die from "./Components/Die"
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice())

  function holdDice(id){
    setDice(oldDice => oldDice.map(die =>{
      return die.id === id ? 
      {...die, isHeld : !die.isHeld} :
      die
    }))
  }

  function generateNewDie(){
      return {
        value:Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      }
  }

  function allNewDice(die){
    const newDice = []
    for(let i = 0 ; i < 10; i ++){
      newDice.push(generateNewDie())
    } 
    return newDice
  }

  function rollDice(){
    setDice(oldDice=>oldDice.map(die=>{
      return die.isHeld ? 
        die:
        generateNewDie()
    }))
  }

  const diceElements = dice.map(die=> <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={()=> holdDice(die.id)} />)

  const[tenzies, setTenzies] = React.useState(false)

  React.useEffect(()=>{
    const allHeld = dice.every(die=> die.isHeld)
    const firstValue = dice[0].value
    const allsameValue = dice.every(die=> die.value === firstValue)
    if(allHeld && allsameValue){
      setTenzies(true)
    
    }
  }, [dice] )

  function newGame(e){
    window.location.reload()
  }

  return (
    <main>
        <h1 className="ttl">Tenzies</h1>
        <p className="instructions">Premi Roll fino a ottnere tutti numeri uguali<br/> Clicca sui dadi per bloccare il numero </p>
        <div className="grid">
          {diceElements}
        </div>
        <button className="btn" onClick={tenzies ? newGame : rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        {tenzies && <Confetti/>} 
    </main>
  )
}