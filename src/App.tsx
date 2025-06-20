import { useState, useEffect } from 'react'
import axios from "axios"
import './App.css'
import Banner from './components/Banner'
import ActionBox from './components/ActionBox'
import Board from './components/Board'

function App() {
  // ActionBox states
  const [size, setSize] = useState(8);
  const [delay, setDelay] = useState(200);
  const [colour, setColour] = useState("White");

  // Board state and move list
  const [activeSquare, setActiveSquare] = useState([-1, -1]);
  const [moveMap, setMoveMap] = useState(new Map());

  // global run states
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // toggle states
  const [soundStatus, setSoundStatus] = useState(() => {
    const status = localStorage.getItem("sound status");
    return status ? status : "on";
  });

  const appStates = [isRunning, isFinished, isLoading];
  const moveSound = new Audio("/chess-move.mp3");
  moveSound.preload = "auto";


  useEffect(() => {

    // serve front end via api call, display error if failed
    try {
      fetch("http://127.0.0.1:5000");
    } catch(error) {
      alert('Error fetching data\n ' + error);
    }

  }, []);


  // fetchAPI() retrieves result of api call to main.py,
  // returns list of moves to solve knight's tour or [[-1]]
  // if there is no solution found
  async function fetchAPI() {
    const url = "http://127.0.0.1:5000/solve?size=" + size 
                  + "&row=" + activeSquare[0] + "&col=" + activeSquare[1];

    // attempt to fetch data, display error message if failed
    try {
      const response = await axios.get(url);
      return response.data.moves;
    } catch(error) {
        alert("Error Fetching Move Data\n" + error);
        setIsRunning(false);
    }
  }


  // function playSound() plays sound effect of piece moving
  function playSound(sound: HTMLAudioElement) {
    const clone = sound.cloneNode();
    (clone as HTMLAudioElement).play();
  }


  // sleep(ms) pauses for a specified number of ms
  function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }


  // solveTour() performs Knights Tour solving and 
  // displays result when button is clicked
  async function solveTour() {
    setIsRunning(true);
    setIsLoading(true);
    await sleep(500);

    // get solution from main.py
    const moveList = await fetchAPI();
    setIsLoading(false);

    // check if a solution was found
    if(moveList.length === 1 && moveList[0][0] === -1) {
      // stop running and display error message
      setIsRunning(false);
      await sleep(100);
      alert("No solution found. Please choose a different starting position or board size.");

    } else {
      const len = moveList.length;

      // display solved knight's tour
      for(let i = 0; i < len; i++) {
        const coord = moveList[i];
        const r = coord[0];
        const c = coord[1];
        const ID = "row " + r + " col " + c;

        // update active square, add to map, play sound effect
        if(soundStatus === "on" && delay >= 30) { playSound(moveSound); }
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


  // toggleSound() turns on/off sound in the app
  function toggleSound() {
    var status = (soundStatus === "on") ? "off" : "on";

    localStorage.setItem("sound status", status);
    setSoundStatus(status);
  }


  // functions to pass to child components
  const changeHandlers = [handleSizeChange, setDelay];
  const clickHandlers = [solveTour, clearBoard];
  

  return (<>
    <Banner isSoundOn={soundStatus === "on" ? true : false} toggleFunction={toggleSound}/>
    <div className="body">
        <ActionBox states={appStates} activeSquare={activeSquare} numberChangers={changeHandlers} 
                   optionChanger={setColour} clickHandlers={clickHandlers}></ActionBox>
        <div className="right-panel">
            {isLoading ? <div className="loader"></div> : null}
            <Board size={size} activeSquare={activeSquare} knightColour={colour} states={appStates} 
                   moves={moveMap} isSoundOn={soundStatus === "on" ? true : false} 
                   sound={moveSound} clickHandler={setActiveSquare}/>
        </div>
    </div>
  </>);
}

export default App
