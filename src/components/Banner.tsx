import '/src/App.css';
import ThemeSwitch from './ThemeSwitch';

export default function Banner() {
    return (<>
        <div className="header">
            <p id="title">Knight's Tour Solver</p>
            <ThemeSwitch/>
        </div>
    </>)
};