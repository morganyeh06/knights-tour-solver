import { useState } from 'react'
import './App.css'
import Banner from './components/Banner'
import ActionBox from './components/ActionBox'
import Board from './components/Board'

function App() {
  const [size, setSize] = useState(8);
  const [delay, setDelay] = useState(200);
  const [colour, setColour] = useState("White");

  const functions = [setSize, setDelay];

  return (<>
    <Banner/>
    <div className="body">
        <ActionBox parentCallbacks={functions}></ActionBox>
        <Board size={size}/>
    </div>
    </>);
}

export default App
