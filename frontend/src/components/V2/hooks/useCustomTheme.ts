import useDarkMode from "use-dark-mode";

export interface CustomTheme {
    readonly isDarkMode: boolean;
    readonly themeClass: string;
}

export const useCustomTheme = (): CustomTheme => {
    const darkMode = useDarkMode();
    let isDarkMode = darkMode.value;
    return {
        isDarkMode,
        themeClass: `${
            isDarkMode ? "dark" : "light"
        } text-foreground bg-background`,
    };
};
