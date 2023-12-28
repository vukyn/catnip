import { memo } from "react";
import QueueEmptyImg from "../assets/img/bg-1-1.png";
import "react-jinke-music-player/assets/index.css";

const IndexPage = () => {
	return (
		<div className="flex flex-col gap-2">
			<img className="rounded-lg" title="meowws" aria-label="meowws" src={QueueEmptyImg} />
			<p className="text-xl font-mono font-bold text-center">play some music ~hooman~</p>
		</div>
	);
};

export default memo(IndexPage);
