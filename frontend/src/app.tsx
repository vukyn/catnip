import { createContext, useEffect, useState } from "react";
import { Layout } from "./components/V2/layout/layout";
import { default as MusicPlayer, ReactJkMusicPlayerAudioListProps as AudioList, TransformedDownloadAudioInfo } from "react-jinke-music-player";
import { Outlet } from "react-router-dom";
import download from "downloadjs";

export type AudioContextType = {
	audioLists: AudioList[];
	setAudioLists: React.Dispatch<React.SetStateAction<AudioList[]>>;
};
export const AudioContext = createContext<AudioContextType | null>(null);

const App = () => {
	const [audioList, setAudioList] = useState<AudioList[]>([]);
	const [isPlaying, setIsPlaying] = useState(false);

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
		if (audioList.length > 0) {
			setIsPlaying(true);
		}
	}, [audioList]);

	return (
		<Layout>
			<div className="h-full">
				<div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
					<AudioContext.Provider value={{ audioLists: audioList, setAudioLists: setAudioList }}>
						<Outlet />
					</AudioContext.Provider>
					<MusicPlayer
						audioLists={audioList}
						mode="full"
						theme="light"
						autoPlay={isPlaying}
						onAudioListsChange={(_, audioList) => onAudioListChange(audioList)}
						customDownloader={handleDownload}
					/>
				</div>
			</div>
		</Layout>
	);
};

export default App;
