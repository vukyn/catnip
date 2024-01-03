import { Sidebar } from "./components/sidebar.styles";
import { CompaniesDropdown } from "./components/sidebar-logo";
import { HomeIcon } from "src/components/icons/home-icon";
import { PlayIcon } from "src/components/icons/play-circle-icon";
import { PortraitIcon } from "src/components/icons/portrait-icon";
import { HeartIcon } from "src/components/icons/heart-icon";
import { ListIcon } from "src/components/icons/list-icon";
import { ListMusicIcon } from "src/components/icons/list-music-icon";
import { TrendingUpIcon } from "src/components/icons/trending-up-icon";
import { SettingIcon } from "src/components/icons/setting-icon";
import { SearchV2Icon } from "src/components/icons/search-v2-icon";
import { SidebarItem } from "./components/sidebar-item";
import { SidebarMenu } from "./components/sidebar-menu";
import { useSidebarContext } from "../layout/layout-context";
import { useLocation, useNavigate } from "react-router-dom";
import { CollapseItems, ItemProps } from "./components/collapse-items";
import { useDisclosure } from "@nextui-org/react";
import { AddPlaylistModal } from "src/components/modals/add-playlist-model";
import { SavedPlaylist } from "types/local";
import { useEffect, useState } from "react";
import { SettingModal } from "src/components/modals/setting-modal";

export const SidebarWrapper = () => {
	const { pathname } = useLocation();
	const [playlistItems, setPlaylistItems] = useState<ItemProps[]>([]);
	const { collapsed, setCollapsed } = useSidebarContext();
	const { isOpen: isOpenAddPlaylist, onOpen: onOpenAddPlaylist, onOpenChange: onOpenChangeAddPlaylist } = useDisclosure();
	const { isOpen: isOpenSetting, onOpen: onOpenSetting, onOpenChange: onOpenChangeSetting } = useDisclosure();
	const navigate = useNavigate();

	const onDeletePlaylist = (key: string) => {
		const playlists: SavedPlaylist[] = JSON.parse(window.localStorage.getItem("saved_playlists")!);
		const newPlaylists = playlists.filter((playlist) => playlist.guid !== key);
		window.localStorage.setItem("saved_playlists", JSON.stringify(newPlaylists));
		setPlaylistItems([
			{
				id: "add-playlist",
				title: "+ Add playlist",
				onClick: onOpenAddPlaylist,
				isDefault: true,
				canDelete: false,
				onDelete: () => {},
			},
			...newPlaylists.map((playlist) => ({
				id: playlist.guid,
				title: playlist.title,
				onClick: () => {
					navigate(`/playlist/${playlist.id}`);
				},
				isDefault: false,
				canDelete: true,
				onDelete: onDeletePlaylist,
			})),
		]);
	};

	useEffect(() => {
		if (window.localStorage.getItem("saved_playlists") !== null) {
			const playlists: SavedPlaylist[] = JSON.parse(window.localStorage.getItem("saved_playlists")!);
			setPlaylistItems([
				{
					id: "add-playlist",
					title: "+ Add playlist",
					onClick: onOpenAddPlaylist,
					canDelete: false,
					isDefault: true,
					onDelete: () => {},
				},
				...playlists.map((playlist) => ({
					id: playlist.guid,
					title: playlist.title,
					onClick: () => {
						navigate(`/playlist/${playlist.id}`);
					},
					isDefault: false,
					canDelete: true,
					onDelete: onDeletePlaylist,
				})),
			]);
		} else {
			setPlaylistItems([
				{
					id: "add-playlist",
					title: "+ Add playlist",
					onClick: onOpenAddPlaylist,
					canDelete: false,
					isDefault: true,
					onDelete: () => {},
				},
			]);
		}
	}, []);

	const onAddPlaylist = (playlist: SavedPlaylist) => {
		setPlaylistItems([
			...playlistItems,
			{
				id: "add-playlist",
				title: playlist.title,
				onClick: () => {
					navigate(`/playlist/${playlist.id}`);
				},
				isDefault: true,
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
						<SidebarItem title="Home" icon={<HomeIcon />} href="/" />
						{/* <SidebarMenu title="Main">
							<SidebarItem isActive={pathname === '/discover'} title="Discover" icon={<PlayIcon />} href="discover" />
							<SidebarItem isActive={pathname === '/chart'} title="Chart" icon={<TrendingUpIcon />} href="chart" />
							<SidebarItem isActive={pathname === '/artist'} title="Artist" icon={<PortraitIcon />} href="artist" />
							<SidebarItem isActive={pathname === '/search'} title="Search" icon={<SearchV2Icon />} href="search" />
						</SidebarMenu> */}
						<SidebarMenu title="Your collection">
							{/* <SidebarItem isActive={pathname === '/me/tracks'} title="Tracks" icon={<ListIcon />} href="me/tracks" /> */}
							<CollapseItems icon={<ListMusicIcon />} items={playlistItems} title="Playlists" />
							<AddPlaylistModal
								key="add-playlist"
								isOpen={isOpenAddPlaylist}
								onSave={onAddPlaylist}
								onOpenChange={onOpenChangeAddPlaylist}
							/>
							{/* <SidebarItem isActive={pathname === '/me/likes'} title="Likes" icon={<HeartIcon />} href="me/likes" /> */}
							<SidebarItem title="Setting" icon={<SettingIcon />} onClick={onOpenSetting} />
							<SettingModal key="setting" isOpen={isOpenSetting} onOpenChange={onOpenChangeSetting} />
						</SidebarMenu>
					</div>
				</div>
			</div>
		</aside>
	);
};
