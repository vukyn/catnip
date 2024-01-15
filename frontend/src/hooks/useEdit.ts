import { useLocalStorage, useReadLocalStorage } from "usehooks-ts";
import { KEY_HOOK_EDIT } from "src/constants/hooks";
import { useState } from "react";

type EditType = {
	isEdit: boolean;
	setIsEdit: React.Dispatch<React.SetStateAction<boolean>>;
};

export function useEdit(): EditType {
	const [isEdit, setIsEdit] = useState<boolean>(false);
	return { isEdit, setIsEdit };
}

export function useReadEdit() {
	const isEdit = useReadLocalStorage(KEY_HOOK_EDIT);
	return isEdit;
}

export function usePersistEdit(): EditType {
	const [isEdit, setIsEdit] = useLocalStorage<boolean>(KEY_HOOK_EDIT, false);
	return { isEdit, setIsEdit };
}
