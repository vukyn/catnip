package models

import (
	ytModel "catnip/backend/youtube/models"

	"github.com/jinzhu/copier"
)

type Playlist struct {
	Id           string          `json:"id"`
	Title        string          `json:"title"`
	ChannelId    string          `json:"channel_id"`
	ChannelTitle string          `json:"channel_title"`
	Description  string          `json:"description"`
	PublishedAt  string          `json:"published_at"`
	Thumbnail    string          `json:"thumbnail"`
	Items        []*PlaylistItem `json:"items"`
}

func (p *Playlist) ParseFromYoutube(in *ytModel.Playlist) {
	p.Id = in.Id
	copier.Copy(p, in.Snippet)
	if in.Snippet.Thumbnails.Maxres != nil {
		p.Thumbnail = in.Snippet.Thumbnails.Maxres.Url
	} else if in.Snippet.Thumbnails.Standard != nil {
		p.Thumbnail = in.Snippet.Thumbnails.Standard.Url
	} else if in.Snippet.Thumbnails.High != nil {
		p.Thumbnail = in.Snippet.Thumbnails.High.Url
	} else {
		p.Thumbnail = in.Snippet.Thumbnails.Default.Url
	}
}

type PlaylistItem struct {
	Title       string `json:"title"`
	Position    int    `json:"position"`
	Description string `json:"description"`
	VideoId     string `json:"video_id"`
}

func (p *PlaylistItem) ParseFromListItem(in *ytModel.PlaylistItem) []*PlaylistItem {
	out := make([]*PlaylistItem, 0)
	for _, v := range in.Items {
		item := &PlaylistItem{}
		copier.Copy(item, v.Snippet)
		item.VideoId = v.Snippet.ResourceId.VideoId
		out = append(out, item)
	}
	return out
}
