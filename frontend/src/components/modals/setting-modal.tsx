import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from "@nextui-org/react";
import { useState } from "react";
import { useTheme } from "src/hooks/useTheme";
import { DownloadPath } from "types/local";

type Props = {
	isOpen: boolean;
	onOpenChange: (isOpen: boolean) => void;
};

export const SettingModal = ({ isOpen, onOpenChange }: Props) => {
	const { themeClass } = useTheme();
	const [downloadPath, setDownloadPath] = useState<string>("");

	const onSavePath = () => {
		let obj: DownloadPath = {
			path: downloadPath,
		};
		window.localStorage.setItem("download_path", JSON.stringify(obj));
		onModalClose();
	};

	const onModalClose = () => {
		setDownloadPath("");
		onOpenChange(false);
	};

	return (
		<Modal className={themeClass} isOpen={isOpen} onOpenChange={onOpenChange} onClose={onModalClose} placement="top-center">
			<ModalContent>
				{(onClose) => (
					<>
						<ModalHeader className="flex flex-col gap-1">Set download path</ModalHeader>
						<ModalBody className="flex flex-col">
							<Input
								placeholder="Download path"
								variant="bordered"
								value={downloadPath}
								onChange={(e) => setDownloadPath(e.target.value)}
							/>
						</ModalBody>
						<ModalFooter>
							<Button color="danger" variant="flat" onClick={onClose}>
								Close
							</Button>
							<Button color="primary" onPress={onSavePath}>
								Save
							</Button>
						</ModalFooter>
					</>
				)}
			</ModalContent>
		</Modal>
	);
};
