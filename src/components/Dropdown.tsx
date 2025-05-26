import '/src/App.css';

interface Props {
    name: string;
    id: string;
    text: string;
    options: Array<string>;
}

export default function Dropdown({name, id, text, options} : Props) {
    const dropdownOptions = options.map((opt) => (<option key={opt}>{opt}</option>));

    return (<>
        <div className="field-row">
            <label className="input-label" htmlFor={id}>{text}</label>
            <select name={name} className="form-control input-field" id={id}>
                {dropdownOptions}
            </select>
        </div>
    </>);
}