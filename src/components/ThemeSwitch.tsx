import '/src/App.css';
import { useState, useEffect } from 'react';
import Sun from "/src/assets/sun.svg";
import Moon from "/src/assets/moon.svg";

export default function ThemeSwitch() {
    const [appTheme, setAppTheme] = useState(() => {
        const theme = localStorage.getItem("theme");
        return theme ? theme : "light";
  });

    function handleChange() {
        var theme = "";

        if(appTheme === "light") {
            theme = "dark";
        } else {
            theme = "light";
        }

        setAppTheme(theme);
        localStorage.setItem("theme", theme);
    }

    useEffect(() => {   
        if (appTheme === "dark") {
            document.documentElement.setAttribute('data-theme', 'dark');
        } else {
            document.documentElement.setAttribute('data-theme', 'light');
        }
        }, [appTheme]);

    return (<>
        <div className="theme-toggle">
            <input type="checkbox" id="theme-switch" checked={appTheme === "dark" ? true : false} onChange={handleChange}></input>
            <label htmlFor="theme-switch">
                <img src={appTheme === "dark" ? Moon : Sun} alt={appTheme === "dark" ? "moon" : "sun"} className="toggle-img" title="Toggle Light/Dark Mode"></img>
            </label>
        </div> 
    </>)
};