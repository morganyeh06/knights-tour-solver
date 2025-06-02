import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'
import Banner from './components/Banner'
import ActionBox from './components/ActionBox'
import Board from './components/Board'

function App() {
  const [size, setSize] = useState(8);
  const [delay, setDelay] = useState(200);
  const [colour, setColour] = useState("White");
  const [startSquare, setStartSquare] = useState([-1, -1]);

  // fetchAPI() retrieves result of api call to main.py,
  // returns list of moves to solve knight's tour or [[-1]]
  // if there is no solution found
  async function fetchAPI() {
    const base = "http://127.0.0.1:8080/?size=" + size 
                  + "&row=" + startSquare[0] + "&col=" + startSquare[1];
    const response = await axios.get(base);
    console.log(response.data.moves);
  }


  // solve() performs Knights Tour solving and animation when button is clicked
  function solve() {
    fetchAPI();
  }

  // handleSizeChange(num) sets size to num and
  // sets startSquare to [-1, -1] if it is out of bounds
  function handleSizeChange(num: number) {
    setSize(num);

    // check if out of bounds and reset
    if(startSquare[0] >= num || startSquare[1] >= num) {
      setStartSquare([-1,-1]);
    }
  }

  const functions = [handleSizeChange, setDelay];

  return (<>
    <Banner/>
    <div className="body">
        <ActionBox startSquare={startSquare} parentCallbacks={functions} optionChanger={setColour} clickHandler={solve}></ActionBox>
        <Board size={size} startingCoord={startSquare} knightColour={colour} clickHandler={setStartSquare}/>
    </div>
    </>);
}

export default App
