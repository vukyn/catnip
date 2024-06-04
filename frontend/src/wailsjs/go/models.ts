export namespace models {
	
	export class GetPlaylistItemRequest {
	    id: string;
	    page?: number;
	    page_token?: string;
	    size?: number;
	
	    static createFrom(source: any = {}) {
	        return new GetPlaylistItemRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.page = source["page"];
	        this.page_token = source["page_token"];
	        this.size = source["size"];
	    }
	}
	export class GetPlaylistRequest {
	    id: string;
	    page?: number;
	    page_token?: string;
	    size?: number;
	
	    static createFrom(source: any = {}) {
	        return new GetPlaylistRequest(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.page = source["page"];
	        this.page_token = source["page_token"];
	        this.size = source["size"];
	    }
	}
	export class PlaylistItemDetail {
	    title: string;
	    position: number;
	    description: string;
	    video_id: string;
	    thumbnail: string;
	    published_at: string;
	    author: string;
	
	    static createFrom(source: any = {}) {
	        return new PlaylistItemDetail(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.title = source["title"];
	        this.position = source["position"];
	        this.description = source["description"];
	        this.video_id = source["video_id"];
	        this.thumbnail = source["thumbnail"];
	        this.published_at = source["published_at"];
	        this.author = source["author"];
	    }
	}
	export class PlaylistItem {
	    total: number;
	    page: number;
	    size: number;
	    prev: string;
	    next: string;
	    items: PlaylistItemDetail[];
	
	    static createFrom(source: any = {}) {
	        return new PlaylistItem(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.total = source["total"];
	        this.page = source["page"];
	        this.size = source["size"];
	        this.prev = source["prev"];
	        this.next = source["next"];
	        this.items = this.convertValues(source["items"], PlaylistItemDetail);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	export class Playlist {
	    id: string;
	    title: string;
	    channel_id: string;
	    channel_title: string;
	    description: string;
	    published_at: string;
	    thumbnail: string;
	    items: PlaylistItem[];
	
	    static createFrom(source: any = {}) {
	        return new Playlist(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.channel_id = source["channel_id"];
	        this.channel_title = source["channel_title"];
	        this.description = source["description"];
	        this.published_at = source["published_at"];
	        this.thumbnail = source["thumbnail"];
	        this.items = this.convertValues(source["items"], PlaylistItem);
	    }
	
		convertValues(a: any, classs: any, asMap: boolean = false): any {
		    if (!a) {
		        return a;
		    }
		    if (a.slice && a.map) {
		        return (a as any[]).map(elem => this.convertValues(elem, classs));
		    } else if ("object" === typeof a) {
		        if (asMap) {
		            for (const key of Object.keys(a)) {
		                a[key] = new classs(a[key]);
		            }
		            return a;
		        }
		        return new classs(a);
		    }
		    return a;
		}
	}
	
	export class Video {
	    id: string;
	    title: string;
	    duration: string;
	    caption: string;
	    view_count: number;
	    like_count: number;
	    comment_count: number;
	    channel_id: string;
	    channel_title: string;
	    description: string;
	    published_at: string;
	    thumbnail: string;
	    tags: string[];
	
	    static createFrom(source: any = {}) {
	        return new Video(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.duration = source["duration"];
	        this.caption = source["caption"];
	        this.view_count = source["view_count"];
	        this.like_count = source["like_count"];
	        this.comment_count = source["comment_count"];
	        this.channel_id = source["channel_id"];
	        this.channel_title = source["channel_title"];
	        this.description = source["description"];
	        this.published_at = source["published_at"];
	        this.thumbnail = source["thumbnail"];
	        this.tags = source["tags"];
	    }
	}

}

