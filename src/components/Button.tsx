import '/src/App.css'

interface Props {
    text: string;
    id: string;
    isDisabled: boolean;
    clickHandler: () => void;
}

export default function Button({text, id, isDisabled, clickHandler} : Props) {
    const classes = isDisabled ? "disabled" : "button";

    return <button type="button" className={classes} id={id} disabled={isDisabled} onClick={clickHandler}><span>{text} </span></button>
};