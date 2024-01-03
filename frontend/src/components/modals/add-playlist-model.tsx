import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Image, Spinner } from "@nextui-org/react";
import { useEffect, useState } from "react";
import { GetPlaylistById } from "src/wailsjs/go/handler/Playlist";
import { IPlaylist } from "types/index";
import { PasteIcon } from "src/components/icons/paste-icon";
import { SavedPlaylist } from "types/local";
import { uuidv4 } from "src/utils/guid";
import { useCustomTheme } from "src/hooks/useCustomTheme";
import { useInputFocus } from "src/hooks/useInputFocus";
import { InputFocusContext, useInputFocusContext } from "src/hooks/useInputFocusContext";

type Props = {
	isOpen: boolean;
	onSave: (playlist: SavedPlaylist) => void;
	onOpenChange: (isOpen: boolean) => void;
};

export const AddPlaylistModal = ({ isOpen, onSave, onOpenChange }: Props) => {
	const { themeClass } = useCustomTheme();
	const [loading, setLoading] = useState<boolean>(false);
	const [url, setUrl] = useState<string>("");
	const [title, setTitle] = useState<string>("");
	const { focused, setFocused } = useInputFocusContext();
	const [playlist, setPlaylist] = useState<IPlaylist>({
		id: "",
		title: "",
		channel_id: "",
		channel_title: "",
	});

	const resetPlaylist = () => {
		setPlaylist({
			id: "",
			title: "",
			channel_id: "",
			channel_title: "",
		});
	};

	const onGetFromClipboard = () => {
		navigator.clipboard.readText().then((text) => {
			setUrl(text);
			onQuery(text);
		});
	};

	const onChangeUrl = (text: string) => {
		setUrl(text);
		onQuery(text);
	};

	const onQuery = (value: string) => {
		if (!value.includes("/playlist?list=")) return;

		const id = value.split("list=")[1];
		setLoading(true);
		GetPlaylistById({ id })
			.then((data) => {
				if (title.length === 0) setTitle(data.title);
				setPlaylist({
					...data,
				});
				setLoading(false);
			})
			.catch(() => console.log("error", "Failed to get playlist, please try again later."));
	};

	const onSavePlaylist = () => {
		let newItem: SavedPlaylist = {
			id: playlist.id,
			guid: uuidv4(),
			title: title,
			type: "custom",
		};
		if (window.localStorage.getItem("saved_playlists") !== null) {
			const playlists: SavedPlaylist[] = JSON.parse(window.localStorage.getItem("saved_playlists")!);

			playlists.unshift(newItem);

			window.localStorage.setItem("saved_playlists", JSON.stringify(playlists));
		} else {
			window.localStorage.setItem("saved_playlists", JSON.stringify([newItem]));
		}
		onSave(newItem);
		onModalClose();
	};

	const onModalClose = () => {
		setUrl("");
		setTitle("");
		setLoading(false);
		resetPlaylist();
		onOpenChange(false);
	};

	useEffect(() => {
		console.log("inputFocused", focused);
	}, [focused]);

	return (
		<Modal className={themeClass} isOpen={isOpen} onOpenChange={onOpenChange} onClose={onModalClose} placement="top-center">
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">Get from Youtube</ModalHeader>
						<ModalBody className="flex flex-col">
							<Input
								placeholder="Playlist URL"
								variant="bordered"
								value={url}
								onChange={(e) => onChangeUrl(e.target.value)}
								onFocus={() => setFocused(true)}
								onBlur={() => setFocused(false)}
								endContent={
									url.length === 0 && (
										<Button isIconOnly aria-label="Paste" variant="light" size="sm" onClick={onGetFromClipboard}>
											<PasteIcon />
										</Button>
									)
								}
							/>
							<Input placeholder="Title" variant="bordered" value={title} onChange={(e) => setTitle(e.target.value)} />
							<div className="w-full flex flex-row justify-center">{loading ? <Spinner color="secondary" /> : ""}</div>
							<div className="w-full flex flex-row justify-center">
								<Image width={300} alt="" src={playlist.thumbnail} />
							</div>
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
