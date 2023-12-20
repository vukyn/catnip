import { createContext, useEffect, useState } from 'react';
import { Layout } from './components/V2/layout/layout';
import { default as MusicPlayer, ReactJkMusicPlayerAudioListProps as AudioList } from 'react-jinke-music-player';
import { Outlet } from 'react-router-dom';

export type AudioContextType = {
	audioLists: AudioList[];
	setAudioLists: React.Dispatch<React.SetStateAction<AudioList[]>>;
};
export const AudioContext = createContext < AudioContextType | null>(null);

const App = () => {
	const [audioLists, setAudioLists] = useState<AudioList[]>([]);
	const [isPlaying, setIsPlaying] = useState(false);

	useEffect(() => {
		if (audioLists.length > 0) {
			setIsPlaying(true);
		}
	}, [audioLists]);
	return (
		<Layout>
			<div className="h-full">
				<div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
					<AudioContext.Provider value={{ audioLists, setAudioLists }}>
						<Outlet />
					</AudioContext.Provider>
					<MusicPlayer audioLists={audioLists} mode="full" theme="light" autoPlay={isPlaying} />
				</div>
			</div>
		</Layout>
	);
};

export default App;
