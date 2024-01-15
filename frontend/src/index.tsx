import { useEffect, useState } from "react";
import { Layout } from "src/components/layout/layout";
import {
	default as MusicPlayer,
	ReactJkMusicPlayerAudioListProps as AudioList,
	TransformedDownloadAudioInfo,
	ReactJkMusicPlayerInstance,
} from "react-jinke-music-player";
import { Outlet } from "react-router-dom";
import { useTheme } from "src/hooks/useTheme";
import { AudioContext } from "src/hooks/useAudioContext";
import { KEY_HOOK_EDIT } from "src/constants/hooks";
import { QUEUE_PLAYLIST } from "src/constants/local_storage";

const Index = () => {
	const { isDarkMode } = useTheme();
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
		if (window.localStorage.getItem(QUEUE_PLAYLIST) !== null) {
			setAudioList(JSON.parse(window.localStorage.getItem(QUEUE_PLAYLIST)!));
		}
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

	useEffect(() => {
		window.localStorage.setItem(QUEUE_PLAYLIST, JSON.stringify(audioList));
	}, [audioList]);

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
						quietUpdate
						// autoHiddenCover
						showMediaSession
						spaceBar={true}
						audioLists={audioList}
						mode="full"
						theme={isDarkMode ? "dark" : "light"}
						showThemeSwitch={false}
						onAudioListsChange={(_, audioList) => onAudioListChange(audioList)}
						customDownloader={handleDownload}
						getAudioInstance={(instance) => (audioInstance = instance)}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default Index;
