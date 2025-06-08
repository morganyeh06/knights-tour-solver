import '/src/App.css';
import On from '/src/assets/sound-on.svg';
import Off from '/src/assets/sound-off.svg';

interface Props {
    isSoundOn: boolean;
    handleChange: () => void;
}

export default function SoundToggle({isSoundOn, handleChange} : Props) {

    return (<>
        <div className="sound-toggle">
            <input type="checkbox" id="sound-switch" checked={isSoundOn} onChange={handleChange}></input>
            <label htmlFor="sound-switch">
                <img title="Toggle Sound" src={isSoundOn ? On : Off} alt={isSoundOn ? "sound on" : "sound off"} className="toggle-img"></img>
            </label>
        </div> 
    </>)
}