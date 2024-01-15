import { Button, ButtonGroup, Card, CardBody, CardHeader, Divider, Image, Skeleton, Spacer } from "@nextui-org/react";
import { SongCard } from "src/pages/playlist/components/song-card";
import { GetPlaylistById, GetPlaylistItemByPlaylistId } from "src/wailsjs/go/handler/Playlist";
import { memo, useEffect, useState } from "react";
import { IItem, IPlaylist } from "types/index";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ChevronLeftIcon, ChevronRightIcon } from "src/components/icons/chevron-icon";
import { models } from "src/wailsjs/go/models";
import { SAVED_SONGS } from "src/constants/local_storage";

type Props = {};

const PlaylistPage = ({}: Props) => {
	let { id } = useParams();
	const [loading, setLoading] = useState<boolean>(false);
	const [loadingItems, setLoadingItems] = useState<boolean>(false);
	const [playlist, setPlaylist] = useState<IPlaylist>();
	const [items, setItems] = useState<IItem[]>([]);
	const [next, setNext] = useState<string>("");
	const [prev, setPrev] = useState<string>("");
	const [total, setTotal] = useState<number>(0);
	const [page, setPage] = useState<number>(1);

	const onRender = (id: string) => {
		setPage(1);
		setLoading(true);
		setLoadingItems(true);
		GetPlaylistById({ id: id })
			.then((data) => {
				setLoading(false);
				setPlaylist({
					...data,
				});
			})
			.catch(() => toast.error("Failed to get playlist, please try again later."));

		GetPlaylistItemByPlaylistId({ id, page_token: "", size: 10 })
			.then((data) => {
				setLoadingItems(false);
				ReRenderPlaylistItem(data);
			})
			.catch(() => toast.error("Failed to get playlist items, please try again later."));
	};

	const onNext = (id: string) => {
		setLoadingItems(true);
		GetPlaylistItemByPlaylistId({ id, page_token: next, size: 10 })
			.then((data) => {
				setPage(page + 1);
				setLoadingItems(false);
				ReRenderPlaylistItem(data);
				window.scrollTo(0, 0);
			})
			.catch(() => toast.error("Failed to get playlist items, please try again later."));
	};

	const onPrev = (id: string) => {
		setLoadingItems(true);
		GetPlaylistItemByPlaylistId({ id, page_token: prev, size: 10 })
			.then((data) => {
				setPage(page - 1);
				setLoadingItems(false);
				ReRenderPlaylistItem(data);
				window.scrollTo(0, 0);
			})
			.catch(() => toast.error("Failed to get playlist items, please try again later."));
	};

	const ReRenderPlaylistItem = (data: models.PlaylistItem) => {
		setItems(data.items);
		setNext(data.next);
		setPrev(data.prev);
		setTotal(data.total);
		updateLocalSong(data.items);
	};

	const updateLocalSong = (songs: models.PlaylistItemDetail[]) => {
		var savedItem: IItem[] = JSON.parse(window.localStorage.getItem(SAVED_SONGS)!) ?? [];
		songs.forEach((song) => {
			if (!savedItem.find((item) => item.video_id === song.video_id)) {
				savedItem.push(song);
			}
		});
		window.localStorage.setItem(SAVED_SONGS, JSON.stringify(savedItem));
	};

	useEffect(() => {
		if (id) {
			onRender(id);
		}
	}, [id]);

	return (
		<div className="mt-6 gap-6 flex flex-col w-full">
			{/* Album information */}
			<div className="flex flex-col gap-2">
				<div className="gap-5 justify-center w-full">
					<Card className="bg-default-50 rounded-xl shadow-md px-3 w-full">
						<CardHeader className="text-2xl font-semibold">
							<Skeleton className="rounded-lg" isLoaded={!loading}>
								{playlist?.channel_title}
							</Skeleton>
						</CardHeader>
						<Divider />
						<CardBody className="py-5">
							<div className="flex gap-2.5">
								<div className="flex-none">
									<Skeleton className="rounded-lg" isLoaded={!loading}>
										<Image width={300} alt="NextUI hero Image" src={playlist?.thumbnail} />
									</Skeleton>
								</div>
								<Skeleton className="rounded-lg w-full" isLoaded={!loading}>
									<div className="w-full">
										<h1 className="text-xl">{playlist?.title}</h1>
										<div
											className="text-xs overflow-auto max-h-32"
											dangerouslySetInnerHTML={{
												__html: playlist?.description?.replaceAll("\n", "<br/>") || "",
											}}
										></div>
									</div>
								</Skeleton>
							</div>
						</CardBody>
					</Card>
				</div>
			</div>
			{/* Songs */}
			<div className="flex flex-col justify-center w-full py-4 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
				<div className=" w-full flex flex-col gap-4">
					{items &&
						items.map((item) => {
							return <SongCard key={item.video_id} item={item} loadingItems={loadingItems} />;
						})}
				</div>
			</div>
			{/* <Spacer y={3} /> */}
			<div className="flex flex-col justify-center w-full pb-2 px-4 lg:px-0 max-w-[90rem] mx-auto gap-3">
				<div className="flex justify-end">
					<Button className="hover:cursor-default" variant="light" style={{ background: "transparent" }} disableAnimation>
						{page} / {Math.ceil(total / 10)}
					</Button>
					<ButtonGroup>
						<Button isIconOnly isDisabled={prev === ""} onClick={() => onPrev(id!)}>
							<ChevronLeftIcon />
						</Button>
						<Button isIconOnly isDisabled={next === ""} onClick={() => onNext(id!)}>
							<ChevronRightIcon />
						</Button>
					</ButtonGroup>
				</div>
			</div>
			<Spacer y={16} />
		</div>
	);
};

export default memo(PlaylistPage);
