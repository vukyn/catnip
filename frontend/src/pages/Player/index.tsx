import { default as MusicPlayer, ReactJkMusicPlayerAudioListProps as AudioList } from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { Container } from './styles';
import { useEffect, useState } from 'react';
import { SampleAudioList } from '../../types/data';
import { Header } from '../../components/Header';
import { IArtist, IItem, IAudio, IPlaylist } from '../../types';
import QueueEmptyImg from '../../assets/img/bg-1-1.png';
import FavoritesImg from '../../assets/favorite.png';
import LocalImg from '../../assets/local.png';
import AddToQueueImg from '../../assets/addtoqueue.svg';
import { Playlist } from '../../components/Playlist';
import ReactLoading from 'react-loading';
import { NewPlaylistModal } from '../../components/NewPlaylistModal';

export const Player = () => {
	// objects
	const [audios, setAudios] = useState<Array<IAudio>>([]);
	const [artist, setArtist] = useState<IArtist>();
	const [queue, setQueue] = useState<Array<AudioList>>([]);
	const [playlists, setPlaylists] = useState<Array<IPlaylist>>([]);
	const [currentStats, setCurrentStats] = useState<IItem>();
	const [currentPlaylist, setCurrentPlaylist] = useState<IPlaylist>();
	const [userPlaylist, setUserPlaylist] = useState<Array<IPlaylist>>([]);

	// behaviors
	const [newPlaylistModalOpened, setNewPlaylistModalOpened] = useState<boolean>(false);
	const [favoritesModalOpened, setFavoritesModalOpened] = useState<boolean>(false);
	const [playlistModalOpened, setPlaylistModalOpened] = useState<boolean>(false);
	const [localModalOpened, setLocalModalOpened] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	// handlers
	const handleSearchArtist = (id: string) => {};
	const handlePlaylist = (k: number) => {
		// let playlists = JSON.parse(window.localStorage.getItem('playlists')!);
		// playlists.unshift(playlists[k]);
		// delete playlists[k + 1];
		// api.get(`/playlist?id=${playlists[0].id}`)
		// 	.then(({ data }) => {
		// 		setCurrentPlaylist({
		// 			...playlists[0],
		// 			videos: data.videos,
		// 		});
		// 		setPlaylistModalOpened(true);
		// 	})
		// 	.catch(() => notificate('error', "Failed to set playlist, maybe it's private, invalid or was deleted."))
		// 	.finally(() => {
		// 		window.localStorage.setItem('playlists', JSON.stringify(playlists.filter((i: PlaylistT) => i !== null)));
		// 		window.dispatchEvent(new Event('playlistsUpdated'));
		// 	});
	};

	// initial
	useEffect(() => {}, []);

	// events
	const onPlaylistSave = window.addEventListener('playlistsaved', () => {
		setPlaylists(JSON.parse(window.localStorage.getItem('playlists')!));
	});
	// @ts-ignore
	window.removeEventListener('playlistsaved', onPlaylistSave);

	return (
		<>
			{newPlaylistModalOpened && <NewPlaylistModal setNewPlaylistModalOpened={setNewPlaylistModalOpened} />}
			<Container>
				<Header
				// setVideos={setVideos}
				// setLoading={setLoading}
				// setPlaylistsToAdd={setPlaylistsToAdd}
				// moreOptionsOpened={moreOptionsOpened}
				// setMoreOptionsOpened={setMoreOptionsOpened}
				// setArtist={setArtist}
				/>
				<div className="playlistsToAdd">
					{/* {artist && artist.photo !== '' && userPlaylist && userPlaylist.length > 0 && !loading && (
						<div className="artist" onClick={() => handleSearchArtist(artist.id)}>
							<div className="background" style={{ backgroundImage: `url('${artist.photo}')` }}></div>
						</div>
					)} */}

					{/* {userPlaylist &&
						userPlaylist.length > 0 &&
						!loading &&
						userPlaylist.map((i, k) => (
							<Playlist
								title={i.title}
								id={i.id}
								songs={i.songs}
								thumb={i.thumb}
								setPlaylistModalOpened={setPlaylistModalOpened}
								key={k}
								setCurrentPlaylist={setCurrentPlaylist}
							/>
						))} */}
				</div>

				<div className="items">
					{audios.length > 0 && !loading ? (
						audios.map((i, k) => (
							// <Item
							// 	key={k}
							// 	thumb={i.thumb}
							// 	title={i.title}
							// 	author={i.author}
							// 	views={i.views}
							// 	id={i.id}
							// 	duration={i.duration}
							// 	setCurrentAudio={setCurrentAudio}
							// 	setCurrentStats={setCurrentStats}
							// 	position={0}
							// 	// @ts-ignore
							// 	playlist={{}}
							// />
							<></>
						))
					) : loading ? (
						<ReactLoading type="spin" color="#999" width={36} className="spinner" />
					) : (
						<div className="playlists">
							<div title="Favorites" className="playlist" onClick={() => setFavoritesModalOpened(true)}>
								<div className="backgrounds" style={{ backgroundImage: `url('${FavoritesImg}')` }} />
							</div>

							<div title="Local" className="playlist" onClick={() => setLocalModalOpened(true)}>
								<div className="backgrounds" style={{ backgroundImage: `url('${LocalImg}')` }} />
							</div>

							{playlists.length > 0 &&
								playlists.map((i, k) => (
									// i.photo ? (
									// 	<div title={i.name} key={k} className="artist" onClick={() => handleArtist(k)}>
									// 		<div className="background" style={{ backgroundImage: `url('${i.photo}')` }}></div>
									// 	</div>
									// ) : (
									// 	<div title={i.title} key={k} className="playlist" onClick={() => handlePlaylist(k)}>
									// 		<div className="background" style={{ backgroundImage: `url('${i.thumb}')` }}></div>
									// 	</div>
									// )
									<div title={i.title} key={k} className="playlist" onClick={() => handlePlaylist(k)}>
										<div className="background" style={{ backgroundImage: `url('${i.thumb}')` }}></div>
									</div>
								))}
							{audios.length === 0 && !loading && (
								<div className="playlist" onClick={() => setNewPlaylistModalOpened(true)}>
									<div className="background"></div>

									<div className="buttons">
										<img src={AddToQueueImg} width={28} />
									</div>
								</div>
							)}
						</div>
					)}
				</div>

				<div className="queue">
					{!loading &&
						// videos &&
						// videos.length === 0 &&
						(queue && queue.length > 0 ? (
							// queue.map((i, k) => (
							// 	<QueueItem
							// 		key={k}
							// 		position={k}
							// 		title={i.title}
							// 		thumb={i.thumb}
							// 		author={i.author}
							// 		duration={i.duration}
							// 		id={i.id}
							// 	/>
							// ))
							<></>
						) : currentStats && currentStats.title !== '' ? (
							// <QueueItem
							// 	position={0}
							// 	title={currentStats.title}
							// 	author={currentStats.author}
							// 	thumb={currentStats.thumb}
							// 	duration={currentStats.duration}
							// 	id={currentStats.id}
							// />
							<></>
						) : (
							<div className="empty">
								<img src={QueueEmptyImg} />

								<h3>play some music ~hooman~</h3>
							</div>
						))}
				</div>
				<MusicPlayer audioLists={SampleAudioList} mode={'full'} autoPlay={false} />
			</Container>
		</>
	);
};
