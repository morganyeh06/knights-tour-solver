import '/src/App.css';
import NumInput from './NumInput';
import Dropdown from './Dropdown';
import Button from './Button';

interface Props {
    parentCallbacks: Array<(n: number) => void>;
    startSquare: Array<number>;
    optionChanger: (c: string) => void;
    clickHandler: () => void;
}

export default function ActionBox({parentCallbacks, startSquare, optionChanger, clickHandler} : Props) {
    const knights = ["White", "Black"];
    const disabled = (startSquare[0] === -1 && startSquare[1] === -1) ? true : false;

    return (<>
        <div className="box">
            <div className="settings">
                <NumInput id="size" minVal={1} maxVal={10} defaultVal={8} text="Board Size (nxn)" parentCallback={parentCallbacks[0]}/>
                <NumInput id="delay" minVal={100} maxVal={1000} defaultVal={200} text="Move Delay (ms)" parentCallback={parentCallbacks[1]}/>
                <Dropdown name="colors" id="knight-color" text="Knight Colour" options={knights} optionChanger={optionChanger}/>
            </div>
            
            <h2 id="instructions">Select a Starting Position on the Board</h2>
            <Button text="Solve" id="solve-button" isDisabled={disabled} clickFunction={clickHandler}/>
        </div></>)
}