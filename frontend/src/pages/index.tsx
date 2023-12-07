import { Layout } from '../components/V2/layout/layout';
import QueueEmptyImg from '../assets/img/bg-1-1.png';
import { default as MusicPlayer, ReactJkMusicPlayerAudioListProps as AudioList } from 'react-jinke-music-player';
import { SampleAudioList } from '../types/data';
import 'react-jinke-music-player/assets/index.css';

const IndexPage = () => {
	return (
		<>
			<Layout>
				<div className="h-full">
					<div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0  flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
						<div className="flex flex-col gap-2">
							<img src={QueueEmptyImg} />
							<h3>play some music ~hooman~</h3>
							<MusicPlayer audioLists={SampleAudioList} mode="full" theme="light" autoPlay={false} />
						</div>
					</div>
				</div>
			</Layout>
		</>
	);
};

export default IndexPage;
