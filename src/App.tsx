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
  const [activeSquare, setActiveSquare] = useState([-1, -1]);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [moveMap, setMoveMap] = useState(new Map());

  const appStates = [isRunning, isFinished, isLoading];


  // fetchAPI() retrieves result of api call to main.py,
  // returns list of moves to solve knight's tour or [[-1]]
  // if there is no solution found
  async function fetchAPI() {
    const url = "http://127.0.0.1:8080/?size=" + size 
                  + "&row=" + activeSquare[0] + "&col=" + activeSquare[1];
    const response = await axios.get(url);
    return response.data.moves;
  }

  // sleep(ms) pauses for a specified number of ms
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

  // solveTour() performs Knights Tour solving and animation when button is clicked
  async function solveTour() {
    setIsRunning(true);
    setIsLoading(true);
    await sleep(500);

    const moveList = await fetchAPI();
    setIsLoading(false);

    // check if a solution was found
    if(moveList.length === 1 && moveList[0][0] === -1) {
      setIsRunning(false);
      alert("No solution found. Please choose a different starting position or board size.");
    } else {
      const len = moveList.length;

      // display solved knight's tour
      for(let i = 0; i < len; i++) {
        const coord = moveList[i];
        const r = coord[0];
        const c = coord[1];
        const ID = "row " + r + " col " + c;

        // update active square and add to map
        setActiveSquare(coord);
        setMoveMap(moveMap.set(ID, i+1));

        // wait if not first move
        if(i !== 0) {
          await sleep(delay);
        }
        
      }

      setIsFinished(true);
    }
    
  }

  // clearBoard() removes knight and numbers from board,
  // re-enables input fields in ActionBox
  function clearBoard() {
    setActiveSquare([-1, -1]);
    setMoveMap(new Map());

    setIsRunning(false);
    setIsFinished(false);
  }

  // handleSizeChange(num) sets size to num and
  // sets startSquare to [-1, -1] if it is out of bounds
  function handleSizeChange(num: number) {
    setSize(num);

    // check if out of bounds and reset
    if(activeSquare[0] >= num || activeSquare[1] >= num) {
      setActiveSquare([-1,-1]);
    }
  }

  const changeHandlers = [handleSizeChange, setDelay];
  const clickHandlers = [solveTour, clearBoard];

  return (<>
    <Banner/>
    <div className="body">
        <ActionBox states={appStates} activeSquare={activeSquare} numberChangers={changeHandlers} optionChanger={setColour} clickHandlers={clickHandlers}></ActionBox>
        <div className="right-panel">
            {isLoading ? <div className="loader"></div> : null}
            <Board size={size} activeSquare={activeSquare} knightColour={colour} states={appStates} moves={moveMap} clickHandler={setActiveSquare}/>
        </div>
    </div>
  </>);
}

export default App
