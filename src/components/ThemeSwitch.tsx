import '/src/App.css';
import { useState, useEffect } from 'react';
import Sun from "/src/assets/sun.svg";
import Moon from "/src/assets/moon.svg";

export default function ThemeSwitch() {
    const [appTheme, setAppTheme] = useState(() => {
        // get theme from local storage if it exists, 
        // default to light theme
        const theme = localStorage.getItem("theme");
        return theme ? theme : "light";
  });


    // handleChange() updates appTheme and saves to localStorage
    function handleChange() {
        var theme = (appTheme === "light") ? "dark" : "light";

        setAppTheme(theme);
        localStorage.setItem("theme", theme);
    }


    // change them whenever appTheme is updated
    useEffect(() => {   
        // change App appearance depending on appTheme
        if (appTheme === "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
    }, [appTheme]);

    return (<>
        <div className="theme-toggle">
            <input type="checkbox" id="theme-switch" checked={appTheme === "dark"} onChange={handleChange}></input>
            <label htmlFor="theme-switch">
                <img src={appTheme === "dark" ? Moon : Sun} alt={appTheme === "dark" ? "moon" : "sun"} 
                     className="toggle-img" title="Toggle Light/Dark Mode"></img>
            </label>
        </div> 
    </>)
};