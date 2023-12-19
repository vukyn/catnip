import { Layout } from '../../layout/layout';
import { Card, CardBody, CardHeader, Divider, Image, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import { Row } from './components/row';
import { SongCard } from './components/song-card';

type Props = {};

const PlaylistPage = ({}: Props) => {
	const description = `Wren Evans - LOI CHOI (The First Album)\n#LoiChoi #TheFirstAlbum
													#TheNeoPopPunk\n--------------------/-----------------\nCreative: monoX Team\nCreative
													Director: Lim Feng\n3D Artist: Đại Trần\n3D Fashion Designer: Raion Nguyen\nGraphic
													Designers: Ducky Wakk, Blake Nguyen \nVideo Editor: Khang Nguyễn\n\nmonoX Team \nLead of
													Artist Management: Amy Tran \nArtist Management Executive: Ái Vy \nArtist Assistant:
													Quỳnh Anh \nMarketing Manager: Brian Phan\nCreative Social Planner: Trang Dé\nPR &
													Communication: Tôn Thất Minh Khôi\nBusiness Head: Tô Minh An Lộc \nAccount Executive:
													Huyền Vy \nProject Coordinator: Tram Nguyen \nGraphic Designer: Blake Nguyen \nProject
													Producer & Video Editor: Khang Nguyễn \nDocumentary & BTS: Thắng Lê \nAdmin: Ái
													Khanh\n\nSpecial thanks to METUB và Universal Music Vietnam`;
	const columns = [
		{ name: 'NAME', uid: 'name' },
		{ name: 'ROLE', uid: 'role' },
		{ name: 'STATUS', uid: 'status' },
		{ name: 'ACTIONS', uid: 'actions' },
	];
	const users = [
		{
			id: 1,
			name: 'Tony Reichert',
			role: 'CEO',
			team: 'Management',
			status: 'active',
			age: '29',
			avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
			email: 'tony.reichert@example.com',
		},
		{
			id: 2,
			name: 'Zoey Lang',
			role: 'Technical Lead',
			team: 'Development',
			status: 'paused',
			age: '25',
			avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
			email: 'zoey.lang@example.com',
		},
		{
			id: 3,
			name: 'Jane Fisher',
			role: 'Senior Developer',
			team: 'Development',
			status: 'active',
			age: '22',
			avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
			email: 'jane.fisher@example.com',
		},
		{
			id: 4,
			name: 'William Howard',
			role: 'Community Manager',
			team: 'Marketing',
			status: 'vacation',
			age: '28',
			avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
			email: 'william.howard@example.com',
		},
		{
			id: 5,
			name: 'Kristen Copper',
			role: 'Sales Manager',
			team: 'Sales',
			status: 'active',
			age: '24',
			avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
			email: 'kristen.cooper@example.com',
		},
		{
			id: 6,
			name: 'Tony Reichert',
			role: 'CEO',
			team: 'Management',
			status: 'active',
			age: '29',
			avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
			email: 'tony.reichert@example.com',
		},
		{
			id: 10,
			name: 'Kristen Copper',
			role: 'Sales Manager',
			team: 'Sales',
			status: 'active',
			age: '24',
			avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
			email: 'kristen.cooper@example.com',
		},
		{
			id: 8,
			name: 'Jane Fisher',
			role: 'Senior Developer',
			team: 'Development',
			status: 'active',
			age: '22',
			avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
			email: 'jane.fisher@example.com',
		},
		{
			id: 7,
			name: 'Zoey Lang',
			role: 'Technical Lead',
			team: 'Development',
			status: 'paused',
			age: '25',
			avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
			email: 'zoey.lang@example.com',
		},

		{
			id: 9,
			name: 'William Howard',
			role: 'Community Manager',
			team: 'Marketing',
			status: 'vacation',
			age: '28',
			avatar: 'https://i.pravatar.cc/150?u=a048581f4e29026701d',
			email: 'william.howard@example.com',
		},
		{
			id: 11,
			name: 'Tony Reichert',
			role: 'CEO',
			team: 'Management',
			status: 'active',
			age: '29',
			avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
			email: 'tony.reichert@example.com',
		},
		{
			id: 12,
			name: 'Kristen Copper',
			role: 'Sales Manager',
			team: 'Sales',
			status: 'active',
			age: '24',
			avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
			email: 'kristen.cooper@example.com',
		},
		{
			id: 13,
			name: 'Jane Fisher',
			role: 'Senior Developer',
			team: 'Development',
			status: 'active',
			age: '22',
			avatar: 'https://i.pravatar.cc/150?u=a04258114e29026702d',
			email: 'jane.fisher@example.com',
		},
		{
			id: 14,
			name: 'Zoey Lang',
			role: 'Technical Lead',
			team: 'Development',
			status: 'paused',
			age: '25',
			avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026704d',
			email: 'zoey.lang@example.com',
		},
		{
			id: 15,
			name: 'Tony Reichert',
			role: 'CEO',
			team: 'Management',
			status: 'active',
			age: '29',
			avatar: 'https://i.pravatar.cc/150?u=a042581f4e29026024d',
			email: 'tony.reichert@example.com',
		},
		{
			id: 16,
			name: 'Kristen Copper',
			role: 'Sales Manager',
			team: 'Sales',
			status: 'active',
			age: '24',
			avatar: 'https://i.pravatar.cc/150?u=a092581d4ef9026700d',
			email: 'kristen.cooper@example.com',
		},
	];

	return (
		<Layout>
			<div className="h-full">
				<div className="flex justify-center gap-4 xl:gap-12 pt-3 px-4 lg:px-0 flex-wrap xl:flex-nowrap sm:pt-10 max-w-[90rem] mx-auto w-full">
					<div className="mt-6 gap-6 flex flex-col w-full">
						{/* Album information */}
						<div className="flex flex-col gap-2">
							<div className="gap-5 justify-center w-full">
								<Card className="bg-default-50 rounded-xl shadow-md px-3 w-full">
									<CardHeader className="text-2xl font-semibold">Wren Evans - LOI CHOI (The First Album)</CardHeader>
									<Divider />
									<CardBody className="py-5">
										<div className="flex gap-2.5">
											<div className="flex-none">
												<Image
													width={300}
													alt="NextUI hero Image"
													src="https://i.ytimg.com/vi/A8C71-mSkAk/maxresdefault.jpg"
												/>
											</div>
											<div className="w-full">
												<h1 className="text-xl">Wren Evans - LOI CHOI (The First Album) ft. itsnk</h1>
												<div
													className="text-xs overflow-auto max-h-32"
													dangerouslySetInnerHTML={{ __html: description.replaceAll('\n', '<br/>') }}
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
								{users.map(() => {
									return <SongCard />
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
		</Layout>
	);
};

export default PlaylistPage;
