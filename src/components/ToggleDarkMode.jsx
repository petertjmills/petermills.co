import { useState, useEffect } from "react";
import { Toggle } from "./ui/toggle";
import { SunMoon } from "lucide-react";

const ToggleDarkMode = () => {
	const [darkMode, setDarkMode] = useState(false);
	useEffect(() => {
		if (
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) &&
				window.matchMedia("(prefers-color-scheme: dark)").matches)
		) {
			//add dark mode class to html
			document.documentElement.classList.add("dark");
			setDarkMode(true);
		} else {
			//remove dark mode class from html
			document.documentElement.classList.remove("dark");
			setDarkMode(false);
		}
	}, []);

	const handleClick = () => {
		setDarkMode(!darkMode);
		if (darkMode) {
			//remove dark mode class from html
			document.documentElement.classList.remove("dark");
			localStorage.theme = "light";
		} else {
			//add dark mode class to html
			document.documentElement.classList.add("dark");
			localStorage.theme = "dark";
		}
		console.log(darkMode);
	};

	return (
		<Toggle onPressedChange={handleClick} pressed={darkMode} className={"align-center"}>
			<SunMoon />
		</Toggle>
	);
};

export { ToggleDarkMode };
