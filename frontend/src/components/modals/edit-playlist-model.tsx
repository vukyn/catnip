import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { SavedPlaylist } from "types/local";
import { useTheme } from "src/hooks/useTheme";
import { usePersistEdit } from "src/hooks/useEdit";
import { ItemProps } from "src/components/sidebar/components/collapse-items";

type Props = {
	isOpen: boolean;
	item: ItemProps;
	onSave: (playlist: ItemProps) => void;
	onOpenChange: (isOpen: boolean) => void;
};

export const EditPlaylistModal = ({ item, isOpen, onSave, onOpenChange }: Props) => {
	const { themeClass } = useTheme();
	const [title, setTitle] = useState<string>("");
	const { setIsEdit } = usePersistEdit();

	const onSavePlaylist = () => {
		if (window.localStorage.getItem("saved_playlists") !== null) {
			const playlists: SavedPlaylist[] = JSON.parse(window.localStorage.getItem("saved_playlists")!);
			let itemIdx = playlists.findIndex((playlist) => playlist.guid === item.id);
			if (itemIdx > -1) {
				item.title = title;
				playlists[itemIdx].title = title;
				onSave(item);
				window.localStorage.setItem("saved_playlists", JSON.stringify(playlists));
			}
		}
		onModalClose();
	};

	const onModalClose = () => {
		setTitle(item.title);
		setIsEdit(false);
		onOpenChange(false);
	};

	useEffect(() => {
		setTitle(item.title);
	}, [item]);

	return (
		<Modal className={themeClass} isOpen={isOpen} onOpenChange={onOpenChange} onClose={onModalClose} placement="top-center">
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">Edit playlist</ModalHeader>
						<ModalBody className="flex flex-col">
							<Input
								placeholder="Title"
								variant="bordered"
								value={title}
								onChange={(e) => setTitle(e.target.value)}
								onFocus={() => setIsEdit(true)}
								onBlur={() => setIsEdit(false)}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="flat" onClick={onClose}>
								Close
							</Button>
							<Button color="primary" onPress={onSavePlaylist}>
								Save
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
