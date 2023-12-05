import { Layout } from '../components/V2/layout/layout';
import QueueEmptyImg from '../assets/img/bg-1-1.png';
import { default as MusicPlayer, ReactJkMusicPlayerAudioListProps as AudioList } from 'react-jinke-music-player';
import { SampleAudioList } from '../types/data';
import { Container } from './styles';
const IndexPage = () => {
	return (
		<>
			<Layout>
				<Container>
					<div className="empty">
						<img src={QueueEmptyImg} />

						<h3>play some music ~hooman~</h3>
					</div>
				</Container>
			</Layout>
			{/* <MusicPlayer audioLists={SampleAudioList} /> */}
		</>
	);
};

export default IndexPage;
