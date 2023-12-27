package models

import (
	"catnip/backend/models"
	yt1Model "catnip/backend/youtube/models"
	"time"

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

func (p *Playlist) ParseFromYoutubeV1(in *yt1Model.Playlist) {
	p.Id = in.Id
	copier.Copy(p, in.Snippet)
	publishedAt, _ := time.Parse(time.RFC3339, in.Snippet.PublishedAt)
	p.PublishedAt = publishedAt.Format("2006-01-02 15:04:05")
	p.Thumbnail = getThumbnail(in.Snippet.Thumbnails)
}

type GetPlaylistRequest struct {
	Id string `json:"id"`
	models.PaginationRequest
}
