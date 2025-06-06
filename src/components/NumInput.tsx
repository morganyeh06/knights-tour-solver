import '/src/App.css';
import { useState } from 'react';

interface Props {
    id: string;
    minVal: number;
    maxVal: number;
    defaultVal: number;
    text: string;
    isDisabled: boolean
    parentCallback: (num: number) => void;
}

export default function NumInput({id, minVal, maxVal, defaultVal, text, isDisabled, parentCallback} : Props) {
    
    function handleChange() {
        const num = parseInt((document.getElementById(id) as HTMLInputElement).value);
        parentCallback(num);
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