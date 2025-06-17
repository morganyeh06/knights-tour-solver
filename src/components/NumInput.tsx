import '/src/App.css';

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
    // CSS classes for styling
    const classes = isDisabled ? "form-control input-field input-disabled" 
                               : "form-control input-field";
    
    // handleChange() changes App state when component state is changed
    function handleChange() {
        const num = parseInt((document.getElementById(id) as HTMLInputElement).value);
        changeHandler(num);
    }

    return (<>
        <div className="field-row">
            <label className="input-label" htmlFor={id}>{text}</label>
            <input type="number" className={classes}
                id={id} min={minVal} max={maxVal} defaultValue={defaultVal}
                onChange={handleChange} disabled={isDisabled}></input>
        </div>
    </>);
};