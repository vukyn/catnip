import useDarkMode from "use-dark-mode";

export const ThemeSwitcher = () => {
	const darkMode = useDarkMode(false);
	return (
		<span className="cursor-pointer duration-700 hover:opacity-50 text-xl" onClick={darkMode.toggle}>
			{darkMode.value ? "🌞" : "🌚"}
		</span>
	);
};
