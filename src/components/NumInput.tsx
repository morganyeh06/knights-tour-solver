import '/src/App.css';
import { useState } from 'react';

interface Props {
    id: string;
    minVal: number;
    maxVal: number;
    defaultVal: number;
    text: string;
    isDisabled: boolean
    changeHandler: (num: number) => void;
}

export default function NumInput({id, minVal, maxVal, defaultVal, text, isDisabled, changeHandler} : Props) {
    
    function handleChange() {
        const num = parseInt((document.getElementById(id) as HTMLInputElement).value);
        changeHandler(num);
    }

    return (<>
        <div className="field-row">
            <label className="input-label" htmlFor={id}>{text}</label>
            <input type="number" className="form-control input-field" 
            id={id} min={minVal} max={maxVal} defaultValue={defaultVal}
            onChange={handleChange} disabled={isDisabled}></input>
        </div>
    </>);
};