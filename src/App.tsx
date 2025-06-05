import { useState } from 'react'
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
  const [isRunning, setIsRunning] = useState(false);

  // fetchAPI() retrieves result of api call to main.py,
  // returns list of moves to solve knight's tour or [[-1]]
  // if there is no solution found
  async function fetchAPI() {
    const url = "http://127.0.0.1:8080/?size=" + size 
                  + "&row=" + startSquare[0] + "&col=" + startSquare[1];
    const response = await axios.get(url);
    return response.data.moves;
  }

  // sleep(ms) pauses for a specified number of ms
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  // solve() performs Knights Tour solving and animation when button is clicked
  async function solve() {
    setIsRunning(true);
    const moveList = await fetchAPI();

    // check if a solution was found
    if(moveList.length === 1 && moveList[0][0] === -1) {
      console.log("No solution found");
    } else {
      console.log(moveList);
      const len = moveList.length;

      for(let i = 1; i < len; i++) {
        const coord = moveList[i];
        const r = coord[0];
        const c = coord[1];
        const ID = "row " + r + " col " + c;
        const square = document.getElementById(ID);

        setStartSquare(coord);
        
        if(square !== null) {
          console.log(square.id + " | " + ID);
        }

        await sleep(delay);
      }
    }
    
    setIsRunning(false);
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
        <ActionBox isDisabled={isRunning} startSquare={startSquare} parentCallbacks={functions} optionChanger={setColour} clickHandler={solve}></ActionBox>
        <Board size={size} startingCoord={startSquare} knightColour={colour} isDisabled={isRunning} clickHandler={setStartSquare}/>
    </div>
    </>);
}

export default App
