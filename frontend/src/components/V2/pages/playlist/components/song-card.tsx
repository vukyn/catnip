import { Button, Card, CardBody, Image } from '@nextui-org/react';
import { IItem } from '../../../../../types';
import { Play2Icon } from '../../../icons/play-circle-2-icon';
import { DownloadVideo } from '../../../../../wailsjs/go/handler/Playlist';
import { useContext, useState } from 'react';
import { AudioContext, AudioContextType } from '../../../../../app';
import { toast } from 'react-toastify';

type Props = {
	item: IItem;
};

export const SongCard = ({ item }: Props) => {
	const { audioLists, setAudioLists } = useContext(AudioContext) as AudioContextType;
	const [loading, setLoading] = useState(false);

	const onClick = (id: string) => {
		setLoading(true);
		DownloadVideo(id, '')
			.then((data) => {
				setAudioLists([
					...audioLists,
					{
						__PLAYER_KEY__: item.video_id,
						name: item.title,
						singer: item.author,
						musicSrc: () => {
							return Promise.resolve(data);
						},
						cover: item.thumbnail,
					},
				]);
				setLoading(false);
			})
			.catch((err) => {
				setLoading(false);
				toast('error', 'Failed to download, please try again later. error: ', err);
				return;
			});
	};

	return (
		<Card className="bg-default-50 rounded-xl shadow-md px-3 w-full">
			<CardBody className="py-5">
				<div className="flex gap-2.5">
					<div className="relative hover:opacity-80 hover:cursor-pointer" onClick={() => onClick(item.video_id)}>
						<Image width={180} alt="NextUI hero Image" src={item.thumbnail} />
						<Button
							style={{ background: 'transparent' }}
							className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
							isIconOnly
							variant="light"
							aria-label="play song"
							disableAnimation
							isLoading={loading}
							onClick={() => onClick(item.video_id)}
						>
							<Play2Icon fill="#c5cce3" />
						</Button>
					</div>
					<div>
						<h1 className="text-l">{item.title}</h1>
						<div className="grid grid-cols-3">
							<p className="text-xs mt-2">Phát hành: {item.published_at}</p>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
