import { Layout } from "../../layout/layout";
import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { SongCard } from "./components/song-card";
import { GetPlaylistById, GetPlaylistItemByPlaylistId } from "../../../../wailsjs/go/handler/Playlist";
import { memo, useEffect, useMemo, useState } from "react";
import { IItem, IPlaylist } from "../../../../types";
import { useParams } from "react-router-dom";

type Props = {};

const PlaylistPage = ({}: Props) => {
	let { id } = useParams();
	const [playlist, setPlaylist] = useState<IPlaylist>();
	const [items, setItems] = useState<IItem[]>([]);

	const onRender = (id: string) => {
		GetPlaylistById(id)
			.then((data) => {
				setPlaylist({
					...data,
				});
			})
			.catch(() => console.log("error", "Failed to get playlist, please try again later."));

		GetPlaylistItemByPlaylistId(id)
			.then((data) => {
				console.log(data);
				setItems(data);
			})
			.catch(() => console.log("error", "Failed to get playlist, please try again later."));
	};

	useEffect(() => {
		if (id) {
			onRender(id);
		}
	}, [id]);

	return (
		<Layout>
			<div className="h-full">
				<div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
					<div className="mt-6 gap-6 flex flex-col w-full">
						{/* Album information */}
						<div className="flex flex-col gap-2">
							<div className="gap-5 justify-center w-full">
								<Card className="bg-default-50 rounded-xl shadow-md px-3 w-full">
									<CardHeader className="text-2xl font-semibold">{playlist?.channel_title}</CardHeader>
									<Divider />
									<CardBody className="py-5">
										<div className="flex gap-2.5">
											<div className="flex-none">
												<Image width={300} alt="NextUI hero Image" src={playlist?.thumbnail} />
											</div>
											<div className="w-full">
												<h1 className="text-xl">{playlist?.title}</h1>
												<div
													className="text-xs overflow-auto max-h-32"
													dangerouslySetInnerHTML={{
														__html: playlist?.description?.replaceAll("\n", "<br/>") || "",
													}}
												></div>
											</div>
										</div>
									</CardBody>
								</Card>
							</div>
						</div>
						{/* Songs */}
						<div className="flex flex-col justify-center w-full py-5 px-4 lg:px-0  max-w-[90rem] mx-auto gap-3">
							<div className=" w-full flex flex-col gap-4">
								{items &&
									items.map((item) => {
										return <SongCard key={item.video_id} item={item} />;
									})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default memo(PlaylistPage);
