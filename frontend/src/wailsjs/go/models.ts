export namespace models {
	
	export class PlaylistItem {
	    title: string;
	    position: number;
	    description: string;
	    video_id: string;
	    thumbnail: string;
	    published_at: string;
	    author: string;
	
	    static createFrom(source: any = {}) {
	        return new PlaylistItem(source);
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
		    if (a.slice) {
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

}

