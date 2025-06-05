import '/src/App.css';
import NumInput from './NumInput';
import Dropdown from './Dropdown';
import Button from './Button';

interface Props {
    isDisabled: boolean;
    parentCallbacks: Array<(n: number) => void>;
    startSquare: Array<number>;
    optionChanger: (c: string) => void;
    clickHandler: () => void;
}

export default function ActionBox({isDisabled, parentCallbacks, startSquare, optionChanger, clickHandler} : Props) {
    const knights = ["White", "Black"];
    const buttonDisabled = (startSquare[0] === -1 && startSquare[1] === -1 || isDisabled) ? true : false;

    return (<>
        <div className="box">
            <div className="settings">
                <NumInput id="size" minVal={1} maxVal={10} defaultVal={8} text="Board Size (nxn)" parentCallback={parentCallbacks[0]} isDisabled={isDisabled}/>
                <NumInput id="delay" minVal={50} maxVal={1000} defaultVal={200} text="Move Delay (ms)" parentCallback={parentCallbacks[1]} isDisabled={isDisabled}/>
                <Dropdown name="colors" id="knight-color" text="Knight Colour" options={knights} optionChanger={optionChanger} isDisabled={isDisabled}/>
            </div>
            
            <h2 id="instructions">Select a Starting Position on the Board</h2>
            <Button text={isDisabled ? "Running" :"Solve"} id="solve-button" isDisabled={buttonDisabled} clickFunction={clickHandler}/>
        </div></>)
}