import '/src/App.css';
import { useState, useEffect } from 'react';
import Sun from "/src/assets/sun.svg";
import Moon from "/src/assets/moon.svg";

export default function ThemeSwitch() {
    const [isDark, setIsDark] = useState(false);

    function handleChange() {
        setIsDark(!isDark);
    }

    useEffect(() => {
        // css classes to toggle dark mode
        

        if (isDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
            
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        }, [isDark]);

    return (<>
        <div className="theme-toggle">
            <input type="checkbox" id="theme-switch" checked={isDark} onChange={handleChange}></input>
            <label htmlFor="theme-switch">
                <img src={isDark ? Moon : Sun} alt={isDark ? "moon" : "sun"} className="toggle-img" title="Toggle Light/Dark Mode"></img>
            </label>
        </div> 
    </>)
};