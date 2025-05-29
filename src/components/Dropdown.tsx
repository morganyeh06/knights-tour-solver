import '/src/App.css';

interface Props {
    name: string;
    id: string;
    text: string;
    options: Array<string>;
    optionChanger: (c: string) => void;
}

export default function Dropdown({name, id, text, options, optionChanger} : Props) {
    const dropdownOptions = options.map((opt) => (<option key={opt}>{opt}</option>));

    function handleChange() {
        var dropdown = document.getElementById(id) as HTMLSelectElement;
        var index = dropdown!.selectedIndex;
        var option = dropdown.options[index].text;

        optionChanger(option);
    }

    return (<>
        <div className="field-row">
            <label className="input-label" htmlFor={id}>{text}</label>
            <select name={name} className="form-select input-field" id={id} onChange={handleChange}>
                {dropdownOptions}
            </select>
        </div>
    </>);
}