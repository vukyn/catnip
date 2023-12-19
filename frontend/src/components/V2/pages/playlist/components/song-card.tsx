import { Card, CardBody, CardHeader, Divider, Image } from '@nextui-org/react';

export const SongCard = () => {
	return (
		<Card className="bg-default-50 rounded-xl shadow-md px-3 w-full">
			<CardBody className="py-5">
				<div className="flex gap-2.5">
					<div className="flex-none">
						<Image width={180} alt="NextUI hero Image" src="https://i.ytimg.com/vi/A8C71-mSkAk/maxresdefault.jpg" />
					</div>
					<div>
						<h1 className="text-l">WREN EVANS - Phóng Đổ Tim Em | LOI CHOI The First Album (ft. itsnk)</h1>
						<div className="grid grid-cols-3">
							<p className="text-xs mt-2">Phát hành: 2023-12-17T04:24:52Z</p>
						</div>
					</div>
				</div>
			</CardBody>
		</Card>
	);
};
