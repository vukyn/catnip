import { RefObject, useState } from "react";

import { useEventListener } from "usehooks-ts";

export function useFocus<T extends HTMLElement = HTMLElement>(elementRef: RefObject<T>): boolean {
	const [value, setValue] = useState<boolean>(false);

	const handleInputFocus = () => setValue(true);
	const handleInputBlur = () => setValue(false);

	useEventListener("focus", handleInputFocus, elementRef);
	useEventListener("blur", handleInputBlur, elementRef);

	return value;
}
