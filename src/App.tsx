import { useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import ActionBox from './components/ActionBox'
import Board from './components/Board'

function App() {
  const [size, setSize] = useState(8);
  const [delay, setDelay] = useState(200);
  const [colour, setColour] = useState("White");
  const [startSquare, setStartSquare] = useState([0, 0]);

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
        <ActionBox parentCallbacks={functions} optionChanger={setColour}></ActionBox>
        <Board size={size} startingCoord={startSquare} knightColour={colour} clickHandler={setStartSquare}/>
    </div>
    </>);
}

export default App
