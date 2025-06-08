import '/src/App.css';
import ThemeSwitch from './ThemeSwitch';
import SoundToggle from './SoundToggle';

interface Props {
    isSoundOn: boolean
    toggleFunction: () => void;
}

export default function Banner( {isSoundOn, toggleFunction} : Props) {
    return (<>
        <div className="header">
            <p id="title">Knight's Tour Solver</p>
            <div className="toggles">
                <SoundToggle isSoundOn={isSoundOn} handleChange={toggleFunction}/>
                <ThemeSwitch/>
            </div>
            
        </div>
    </>)
};