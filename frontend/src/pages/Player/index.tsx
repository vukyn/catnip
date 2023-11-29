import { default as MusicPlayer, ReactJkMusicPlayerAudioListProps as AudioList } from 'react-jinke-music-player';
import 'react-jinke-music-player/assets/index.css';
import { Container } from './styles';
import { useState } from 'react';
import { SampleAudioList } from '../../interfaces/audio';
import { Header } from '../../components/Header';

export const Player = () => {
	const [audioLists, setAudioLists] = useState<AudioList>();
	const [loading, setLoading] = useState<boolean>(false);
	const [queue, setQueue] = useState<Array<any>>([]);

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
				<div className="playlistsToAdd">
					{/* {artist && artist.photo !== '' && playlistsToAdd && playlistsToAdd.length > 0 && !loading && (
						<div className="artist" onClick={() => handleSearchArtist(artist.id)}>
							<div className="background" style={{ backgroundImage: `url('${artist.photo}')` }}></div>
						</div>
					)} */}

					{/* {playlistsToAdd &&
						playlistsToAdd.length > 0 &&
						!loading &&
						playlistsToAdd.map((i, k) => (
							// @ts-ignore
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
					{/* {videos.length > 0 && !loading ? (
						videos.map((i, k) => (
							<Item
								key={k}
								thumb={i.thumb}
								title={i.title}
								author={i.author}
								views={i.views}
								id={i.id}
								duration={i.duration}
								setCurrentAudio={setCurrentAudio}
								setCurrentStats={setCurrentStats}
								position={0}
								// @ts-ignore
								playlist={{}}
							/>
						))
					) : loading ? (
						<ReactLoading type="spin" color="#999" width={36} className="spinner" />
					) : (
						<div className="playlists">
							<div title="Favorites" className="playlist" onClick={() => setFavoritesModalOpened(true)}>
								<div className="backgrounds" style={{ backgroundImage: `url('${FavoritesBackground}')` }} />
							</div>

							<div title="Local" className="playlist" onClick={() => setLocalModalOpened(true)}>
								<div className="backgrounds" style={{ backgroundImage: `url('${LocalBackground}')` }} />
							</div>

							{playlists.length > 0 &&
								playlists.map((i, k) =>
									i.photo ? (
										<div title={i.name} key={k} className="artist" onClick={() => handleArtist(k)}>
											<div className="background" style={{ backgroundImage: `url('${i.photo}')` }}></div>
										</div>
									) : (
										<div title={i.title} key={k} className="playlist" onClick={() => handlePlaylist(k)}>
											<div className="background" style={{ backgroundImage: `url('${i.thumb}')` }}></div>
										</div>
									)
								)}
							{videos.length === 0 && !loading && (
								<div className="playlist" onClick={() => setNewPlaylistModalOpened(true)}>
									<div className="background"></div>

									<div className="buttons">
										<img src={AddToQueue} width={28} />
									</div>
								</div>
							)}
						</div>
					)} */}
				</div>

				<div className="queue">
					{/* {!loading &&
						videos &&
						videos.length === 0 &&
						(queue && queue.length > 0 ? (
							queue.map((i, k) => (
								<QueueItem
									key={k}
									position={k}
									title={i.title}
									thumb={i.thumb}
									author={i.author}
									duration={i.duration}
									id={i.id}
								/>
							))
						) : currentStats && currentStats.title !== '' ? (
							<QueueItem
								position={0}
								title={currentStats.title}
								author={currentStats.author}
								thumb={currentStats.thumb}
								duration={currentStats.duration}
								id={currentStats.id}
							/>
						) : (
							<div className="empty">
								<img src={QueueEmpty} />

								<h3>Queue empty, try to search for a song or play a list. :)</h3>
							</div>
						))} */}
				</div>
				<MusicPlayer audioLists={SampleAudioList} mode={'full'} />
			</Container>
		</>
	);
};
