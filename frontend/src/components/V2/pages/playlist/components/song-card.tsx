import { Card, CardBody, CardHeader, Divider, Image } from "@nextui-org/react";
import { IItem } from "../../../../../types";

type Props = {
	item: IItem;
};

export const SongCard = ({ item }: Props) => {
	return (
		<Card className="bg-default-50 rounded-xl shadow-md px-3 w-full">
			<CardBody className="py-5">
				<div className="flex gap-2.5">
					<div className="flex-none">
						<Image width={180} alt="NextUI hero Image" src={item.thumbnail} />
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
