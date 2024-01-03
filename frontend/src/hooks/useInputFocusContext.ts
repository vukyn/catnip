import { createContext, useContext } from "react";

type InputFocusContextType = {
	focused: boolean;
	setFocused: React.Dispatch<React.SetStateAction<boolean>>;
};

export const InputFocusContext = createContext<InputFocusContextType>({} as InputFocusContextType);

export const useInputFocusContext = () => {
	return useContext(InputFocusContext);
};
