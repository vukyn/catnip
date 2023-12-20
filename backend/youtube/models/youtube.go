package models

type Playlist struct {
	Id      string `json:"id"`
	Snippet struct {
		Title        string      `json:"title"`
		ChannelId    string      `json:"channelId"`
		ChannelTitle string      `json:"channelTitle"`
		Description  string      `json:"description"`
		PublishedAt  string      `json:"publishedAt"`
		Thumbnails   *Thumbnails `json:"thumbnails"`
	} `json:"snippet"`
}

type PlaylistItem struct {
	Snippet struct {
		Title       string      `json:"title"`
		Position    int         `json:"position"`
		Description string      `json:"description"`
		Thumbnails  *Thumbnails `json:"thumbnails"`
	} `json:"snippet"`
	ContentDetails *ContentDetails `json:"contentDetails"`
}

type Thumbnail struct {
	Url    string `json:"url"`
	Width  int    `json:"width"`
	Height int    `json:"height"`
}

type Thumbnails struct {
	Default  *Thumbnail `json:"default"`
	Medium   *Thumbnail `json:"medium"`
	High     *Thumbnail `json:"high"`
	Standard *Thumbnail `json:"standard"`
	Maxres   *Thumbnail `json:"maxres"`
}

type ContentDetails struct {
	VideoId          string `json:"videoId"`
	VideoPublishedAt string `json:"videoPublishedAt"`
}

type Video struct {
	ContentDetails struct {
		Duration   string `json:"duration"`
		Definition string `json:"definition"`
		Caption    string `json:"caption"`
	} `json:"contentDetails"`
	Statistics struct {
		ViewCount    string `json:"viewCount"`
		LikeCount    string `json:"likeCount"`
		CommentCount string `json:"commentCount"`
	} `json:"statistics"`
	Player struct {
		EmbedHtml string `json:"embedHtml"`
	} `json:"player"`
}

func (v *Video) Normalize() {
	if v.ContentDetails.Duration != "" {
		v.ContentDetails.Duration = v.ContentDetails.Duration[2:]
	}
}

type VideoDownload struct {
	VideoId string `json:"videoId"`
	Url     string `json:"url"`
}
