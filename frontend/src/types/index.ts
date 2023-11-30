export interface IItem {
	thumb: string;
	title: string;
	author: string;
	views: string;
	duration: string;
	id: string;
}

export interface IArtist {
	name: string;
	photo: string;
	id: string;
	playlists: Array<IPlaylist>;
}

export interface IPlaylist {
	id: string;
	thumb: string;
	title: string;
	// songs: number;
	audios: Array<IAudio>;
	type?: string;
}

export interface IAudio {
	author: string;
	duration: string;
	id: string;
	thumb: string;
	title: string;
	views: string;
}
