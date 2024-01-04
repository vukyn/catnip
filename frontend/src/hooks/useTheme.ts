import { useDarkMode } from "usehooks-ts";

export type ThemeType = {
	readonly isDarkMode: boolean;
	readonly themeClass: string;
	readonly toggle: () => void;
};

export const useTheme = (): ThemeType => {
	const { isDarkMode, toggle } = useDarkMode();
	return {
		toggle,
		isDarkMode,
		themeClass: `${isDarkMode ? "dark" : "light"} text-foreground bg-background`,
	};
};
