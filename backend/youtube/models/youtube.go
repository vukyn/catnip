package models

type Playlist struct {
	Title        string
	ChannelId    string
	ChannelTitle string
	Description  string
	PublishedAt  string
	Thumbnails   struct {
		Default  Thumbnail
		Medium   Thumbnail
		High     Thumbnail
		Standard Thumbnail
		Maxres   Thumbnail
	}
	Items []*PlaylistItem
}

type PlaylistItem struct {
	Title       string
	Position    int
	Description string
	VideoId     string
}

type Thumbnail struct {
	Url    string `json:"url"`
	Width  int    `json:"width"`
	Height int    `json:"height"`
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
