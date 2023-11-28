import { Container } from './styles';
import Logo from '../../assets/logo.png';
import LogoBackground from '../../assets/logo-bg.png';
import Search from '../../assets/search.svg';
import Close from '../../assets/close.svg';
import { useRef } from 'react';

export const Header = () => {
	const barRef = useRef<HTMLInputElement>(null);
	const searchRef = useRef<HTMLImageElement>(null);

	const handleClear = () => {
		// setVideos([]);

		// setPlaylistsToAdd([]);

		// setArtist({});

		barRef.current!.value = '';
	};

	return (
		<Container>
			<div className="logo">
				<img src={LogoBackground} width={32} />
				<img src={Logo} width={32} />
			</div>

			<div className="searchBar">
				<input type="text" id="bar" ref={barRef} placeholder="Search" list="list" autoComplete="off" />

				{/* <datalist id="list">
					{searchHistory && searchHistory.length > 0 && searchHistory.map((i, k) => <option key={k}>{i}</option>)}
				</datalist> */}

				<div className="bar-buttons">
					<img src={Search} ref={searchRef} id="search" width={24} />
					<img
						src={Close}
						width={26}
						onClick={() => {
							handleClear();
						}}
					/>
				</div>
			</div>

			{/* <div className="buttons">
				<img src={downloading && Downloading} id="downloading" width={24} />

				<img src={moreOptionsOpened ? Less : More} width={32} onClick={() => setMoreOptionsOpened(!moreOptionsOpened)} />
			</div> */}
		</Container>
	);
};
