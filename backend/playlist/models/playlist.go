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
	p.Thumbnail = getThumbnail(in.Snippet.Thumbnails)
}

type PlaylistItem struct {
	Title       string `json:"title"`
	Position    int    `json:"position"`
	Description string `json:"description"`
	VideoId     string `json:"video_id"`
	Thumbnail   string `json:"thumbnail"`
	PublishedAt string `json:"published_at"`
}

func (p *PlaylistItem) ParseFromListItemYoutube(in []*ytModel.PlaylistItem) []*PlaylistItem {
	out := make([]*PlaylistItem, 0)
	for _, v := range in {
		item := &PlaylistItem{}
		copier.Copy(item, v.Snippet)
		item.VideoId = v.ContentDetails.VideoId
		item.PublishedAt = v.ContentDetails.VideoPublishedAt
		item.Thumbnail = getThumbnail(v.Snippet.Thumbnails)
		out = append(out, item)
	}
	return out
}

func getThumbnail(in *ytModel.Thumbnails) string {
	if in.Maxres != nil {
		return in.Maxres.Url
	} else if in.Standard != nil {
		return in.Standard.Url
	} else if in.High != nil {
		return in.High.Url
	} else {
		return in.Default.Url
	}
}
