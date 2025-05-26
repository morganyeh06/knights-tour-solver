import '/src/App.css';

export default function ThemeSwitch() {

    // element-specfic styles for light and dark labels
    const lightStyle = {
        borderTopRightRadius: 0,
        borderBottomRightRadius: 0
    }

    const darkStyle = {
        borderTopLeftRadius: 0,
        borderBottomLeftRadius: 0
    }

    return (<>
        <input type="radio" className="btn-check" name="options" id="light" defaultChecked></input>
        <label className="btn btn-outline-primary" htmlFor="light" style={lightStyle}>Light</label>

        <input type="radio" className="btn-check" name="options" id="dark"></input>
        <label className="btn btn-outline-primary" htmlFor="dark" style={darkStyle}>Dark</label>
    </>)
}