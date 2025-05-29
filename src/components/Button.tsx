import '/src/App.css'

interface Props {
    text: string;
    id: string;
    isDisabled: boolean;
}

export default function Button({text, id, isDisabled} : Props) {
    const classes = isDisabled ? "disabled" : "button";

    return <button type="button" className={classes} id={id} disabled={isDisabled}><span>{text} </span></button>
}