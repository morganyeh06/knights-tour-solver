import '/src/App.css'

interface Props {
    text: string;
    id: string;
}

export default function Button({text, id} : Props) {

    return <button type="button" className="button" id={id}><span>{text} </span></button>
}