import { useEffect, useState } from "react";

type ReturnType = [boolean, (focused: boolean) => void];

export const useInputFocus = (initValue = false): ReturnType => {
	const [focused, setFocused] = useState(initValue);

	// Update state if initialValue changes
	useEffect(() => {
		if (focused !== initValue) {
			setFocused(initValue);
		}
	}, [initValue]);

	return [focused, setFocused];
};
