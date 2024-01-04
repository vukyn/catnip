import { useEffect, useState } from "react";
import { Layout } from "./components/layout/layout";
import {
	default as MusicPlayer,
	ReactJkMusicPlayerAudioListProps as AudioList,
	TransformedDownloadAudioInfo,
	ReactJkMusicPlayerInstance,
} from "react-jinke-music-player";
import { Outlet } from "react-router-dom";
import { useCustomTheme } from "./hooks/useCustomTheme";
import { AudioContext } from "./hooks/useAudioContext";
import { KEY_HOOK_EDIT } from "./hooks/keys";

const Index = () => {
	const { isDarkMode } = useCustomTheme();
	const [audioList, setAudioList] = useState<AudioList[]>([]);
	let audioInstance = {} as ReactJkMusicPlayerInstance;

	const onAudioListChange = (updatedList: AudioList[]) => {
		// onChange remove audio
		if (audioList.length > updatedList.length) {
			setAudioList(updatedList);
			return;
		}
	};

	const handleDownload = (audioInfo: TransformedDownloadAudioInfo) => {
		const link = document.createElement("a");
		link.href = audioInfo.src;
		link.click();
	};

	useEffect(() => {
		const onPause: (this: Window, ev: KeyboardEvent) => any = (ev) => {
			if (ev.code === "Space") {
				const isEdit = window.localStorage.getItem(KEY_HOOK_EDIT) === "true" ? true : false;
				if (!isEdit) {
					ev.preventDefault();
					audioInstance && audioInstance.togglePlay && audioInstance.togglePlay();
				}
			}
		};
		window.addEventListener("keydown", onPause);
		return () => {
			window.removeEventListener("keydown", onPause);
		};
	}, []);

	return (
		<Layout>
			<div className="h-full">
				<div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
					<AudioContext.Provider
						value={{
							audioLists: audioList,
							setAudioLists: setAudioList,
						}}
					>
						<Outlet />
					</AudioContext.Provider>
					<MusicPlayer
						spaceBar={true}
						audioLists={audioList}
						mode="full"
						theme={isDarkMode ? "dark" : "light"}
						showThemeSwitch={false}
						onAudioListsChange={(_, audioList) => onAudioListChange(audioList)}
						customDownloader={handleDownload}
						showMediaSession
						getAudioInstance={(instance) => (audioInstance = instance)}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default Index;
