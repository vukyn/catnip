import { memo } from 'react';
import QueueEmptyImg from '../assets/img/bg-1-1.png';
import 'react-jinke-music-player/assets/index.css';

const IndexPage = () => {
	return (
		<div className="flex flex-col gap-2">
			<img src={QueueEmptyImg} />
			<h3>play some music ~hooman~</h3>
		</div>
	);
};

export default memo(IndexPage);
