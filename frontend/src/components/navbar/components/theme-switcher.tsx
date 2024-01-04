import { useTheme } from "src/hooks/useTheme";

export const ThemeSwitcher = () => {
	const { isDarkMode, toggle } = useTheme();
	return (
		<span className="cursor-pointer duration-700 hover:opacity-50 text-xl" onClick={toggle}>
			{isDarkMode ? "🌞" : "🌚"}
		</span>
	);
};
