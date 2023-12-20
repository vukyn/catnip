import { Layout } from "./components/V2/layout/layout";
import { default as MusicPlayer, ReactJkMusicPlayerAudioListProps as AudioList } from 'react-jinke-music-player';
import { SampleAudioList } from './types/data';
import { Outlet } from "react-router-dom";

const App = () => {
	return (
		<Layout>
			<div className="h-full">
				<div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
					<Outlet />
					<MusicPlayer audioLists={SampleAudioList} mode="full" theme="light" autoPlay={false} />
				</div>
			</div>
		</Layout>
	);
};

export default App;