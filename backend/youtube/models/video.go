package models

type Video struct {
	Id      string `json:"id"`
	Snippet struct {
		Title        string      `json:"title"`
		ChannelId    string      `json:"channelId"`
		ChannelTitle string      `json:"channelTitle"`
		Description  string      `json:"description"`
		PublishedAt  string      `json:"publishedAt"`
		Thumbnails   *Thumbnails `json:"thumbnails"`
		Tags         []string    `json:"tags"`
	} `json:"snippet"`
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
