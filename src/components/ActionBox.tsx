import '/src/App.css';
import NumInput from './NumInput';
import Dropdown from './Dropdown';
import Button from './Button';

interface Props {
    states: Array<boolean>
    activeSquare: Array<number>;
    numberChangers: Array<(n: number) => void>;
    clickHandlers: Array<() => void>;
    optionChanger: (c: string) => void;
}

export default function ActionBox({states,  activeSquare,  numberChangers, clickHandlers, optionChanger} : Props) {
    // functions and states passed from parent
    const isDisabled = states[0];
    const isFinished = states[1];
    const start = clickHandlers[0];
    const reset = clickHandlers[1];
    const handleSizeChange = numberChangers[0];
    const handleDelayChange = numberChangers[1];

    const knights = ["White", "Black"];
    const buttonDisabled = (activeSquare[0] === -1 && activeSquare[1] === -1 || isDisabled) ? true : false;

    return (<>
        <div className="box">
            <div className="settings">
                <NumInput id="size" minVal={5} maxVal={10} defaultVal={8} text="Board Size (nxn)" changeHandler={handleSizeChange} isDisabled={isDisabled}/>
                <NumInput id="delay" minVal={0} maxVal={1000} defaultVal={200} text="Move Delay (ms)" changeHandler={handleDelayChange} isDisabled={isDisabled}/>
                <Dropdown name="colors" id="knight-color" text="Knight Colour" options={knights} optionChanger={optionChanger} isDisabled={isDisabled}/>
            </div>
            
            <h2 id="instructions">Select a Starting Position on the Board</h2>
            {isFinished ? <Button text="Clear" id="reset-button" isDisabled={false} clickHandler={reset}/>
                         : <Button text={isDisabled ? "Running" : "Solve"} id="solve-button" isDisabled={buttonDisabled} clickHandler={start}/>}
        </div></>)
}