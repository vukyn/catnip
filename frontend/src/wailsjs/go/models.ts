export namespace models {
	
	export class Playlist {
	    id: string;
	    title: string;
	    thumb: string;
	    author: string;
	
	    static createFrom(source: any = {}) {
	        return new Playlist(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.id = source["id"];
	        this.title = source["title"];
	        this.thumb = source["thumb"];
	        this.author = source["author"];
	    }
	}

}

