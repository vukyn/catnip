export interface IItem {
	title: string;
	video_id: string;
	// views: string;
	// duration: string;
	published_at?: string;
	thumbnail?: string;
}

export interface IArtist {
	name: string;
	photo: string;
	id: string;
	playlists: Array<IPlaylist>;
}

export interface IPlaylist {
	id: string;
	title: string;
	channel_id: string;
	channel_title: string;
	description?: string;
	published_at?: string;
	thumbnail?: string;
}

export interface IAudio {
	author: string;
	duration: string;
	id: string;
	thumb: string;
	title: string;
	views: string;
}
