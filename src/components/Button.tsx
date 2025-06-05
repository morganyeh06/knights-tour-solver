import '/src/App.css'

interface Props {
    text: string;
    id: string;
    isDisabled: boolean;
    clickFunction: () => void;
}

export default function Button({text, id, isDisabled, clickFunction} : Props) {
    const classes = isDisabled ? "disabled" : "button";

    return <button type="button" className={classes} id={id} disabled={isDisabled} onClick={clickFunction}><span>{text} </span></button>
};