import { default as MusicPlayer, ReactJkMusicPlayerAudioListProps as AudioList } from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { Container } from './styles';
import { useState } from 'react';
import { SampleAudioList } from '../../interfaces/audio';
import { Header } from '../../components/Header';

export const Player = () => {
	const [audioLists, setAudioLists] = useState<AudioList>();

	return (
		<>
			<Container>
				<Header
				// setVideos={setVideos}
				// setLoading={setLoading}
				// setPlaylistsToAdd={setPlaylistsToAdd}
				// moreOptionsOpened={moreOptionsOpened}
				// setMoreOptionsOpened={setMoreOptionsOpened}
				// setArtist={setArtist}
				/>
				<MusicPlayer audioLists={SampleAudioList} mode={'full'} />
			</Container>
		</>
	);
};
