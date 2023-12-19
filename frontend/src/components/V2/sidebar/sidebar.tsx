import { Sidebar } from './sidebar.styles';
import { CompaniesDropdown } from './sidebar-logo';
import { HomeIcon } from '../icons/home-icon';
import { PlayIcon } from '../icons/play-circle-icon';
import { PortraitIcon } from '../icons/portrait-icon';
import { HeartIcon } from '../icons/heart-icon';
import { ListIcon } from '../icons/list-icon';
import { ListMusicIcon } from '../icons/list-music-icon';
import { TrendingUpIcon } from '../icons/trending-up-icon';
import { SearchV2Icon } from '../icons/search-v2-icon';
import { SidebarItem } from './sidebar-item';
import { SidebarMenu } from './sidebar-menu';
import { useSidebarContext } from '../layout/layout-context';
import { useLocation } from 'react-router-dom';
import { CollapseItems, ItemProps } from './collapse-items';
import { useDisclosure } from '@nextui-org/react';
import { AddPlaylistModal } from '../modal/add-playlist-model';
import { SavedPlaylist } from '../../../types/local';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const SidebarWrapper = () => {
	const { pathname } = useLocation();
	const [playlistItems, setPlaylistItems] = useState<ItemProps[]>([]);
	const { collapsed, setCollapsed } = useSidebarContext();
	const { isOpen, onOpen, onOpenChange } = useDisclosure();
	const navigate = useNavigate();

	const onDeletePlaylist = (key: string) => {
		const playlists: SavedPlaylist[] = JSON.parse(window.localStorage.getItem('saved_playlists')!);
		const newPlaylists = playlists.filter((playlist) => playlist.guid !== key);
		window.localStorage.setItem('saved_playlists', JSON.stringify(newPlaylists));
		setPlaylistItems([
			{
				id: 'add-playlist',
				title: '+ Add playlist',
				onClick: onOpen,
				canDelete: false,
				onDelete: () => {},
			},
			...newPlaylists.map((playlist) => ({
				id: playlist.guid,
				title: playlist.title,
				onClick: () => {
					navigate(`/playlist/${playlist.id}`);
				},
				canDelete: true,
				onDelete: onDeletePlaylist,
			})),
		]);
	};

	useEffect(() => {
		if (window.localStorage.getItem('saved_playlists') !== null) {
			const playlists: SavedPlaylist[] = JSON.parse(window.localStorage.getItem('saved_playlists')!);
			setPlaylistItems([
				{
					id: 'add-playlist',
					title: '+ Add playlist',
					onClick: onOpen,
					canDelete: false,
					onDelete: () => {},
				},
				...playlists.map((playlist) => ({
					id: playlist.guid,
					title: playlist.title,
					onClick: () => {
						navigate(`/playlist/${playlist.id}`);
					},
					canDelete: true,
					onDelete: onDeletePlaylist,
				})),
			]);
		} else {
			setPlaylistItems([
				{
					id: 'add-playlist',
					title: '+ Add playlist',
					onClick: onOpen,
					canDelete: false,
					onDelete: () => {},
				},
			]);
		}
	}, []);

	const onAddPlaylist = (playlist: SavedPlaylist) => {
		setPlaylistItems([
			...playlistItems,
			{
				id: 'add-playlist',
				title: playlist.title,
				onClick: () => {
					navigate(`/playlist/${playlist.id}`);
				},
				canDelete: true,
				onDelete: onDeletePlaylist,
			},
		]);
	};

	return (
		<aside className="h-screen sticky top-0">
			{collapsed ? <div className={Sidebar.Overlay()} onClick={setCollapsed} /> : null}
			<div
				className={Sidebar({
					collapsed: collapsed,
				})}
			>
				<div className={Sidebar.Header()}>
					<CompaniesDropdown />
				</div>
				<div className="flex flex-col justify-between h-full">
					<div className={Sidebar.Body()}>
						<SidebarItem title="Home" icon={<HomeIcon />} isActive={pathname === '/'} href="/" />
						<SidebarMenu title="Main">
							<SidebarItem isActive={pathname === '/discover'} title="Discover" icon={<PlayIcon />} href="discover" />
							<SidebarItem isActive={pathname === '/chart'} title="Chart" icon={<TrendingUpIcon />} href="chart" />
							<SidebarItem isActive={pathname === '/artist'} title="Artist" icon={<PortraitIcon />} href="artist" />
							<SidebarItem isActive={pathname === '/search'} title="Search" icon={<SearchV2Icon />} href="search" />
						</SidebarMenu>
						<SidebarMenu title="Your collection">
							<SidebarItem isActive={pathname === '/me/tracks'} title="Tracks" icon={<ListIcon />} href="me/tracks" />
							<CollapseItems icon={<ListMusicIcon />} items={playlistItems} title="Playlists" />
							<AddPlaylistModal key="add-playlist" isOpen={isOpen} onSave={onAddPlaylist} onOpenChange={onOpenChange} />
							<SidebarItem isActive={pathname === '/me/likes'} title="Likes" icon={<HeartIcon />} href="me/likes" />
						</SidebarMenu>
					</div>
				</div>
			</div>
		</aside>
	);
};
