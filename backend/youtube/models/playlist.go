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
