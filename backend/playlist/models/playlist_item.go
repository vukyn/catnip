package models

import (
	"catnip/backend/models"
	yt1Model "catnip/backend/youtube/models"
	"time"

	"github.com/jinzhu/copier"
)

type PlaylistItem struct {
	models.PaginationResponse
	Items []*PlaylistItemDetail `json:"items"`
}

type PlaylistItemDetail struct {
	Title       string `json:"title"`
	Position    int    `json:"position"`
	Description string `json:"description"`
	VideoId     string `json:"video_id"`
	Thumbnail   string `json:"thumbnail"`
	PublishedAt string `json:"published_at"`
	Author      string `json:"author"`
}

func (p *PlaylistItem) ParseYoutubeV1(in *yt1Model.PlaylistItem) {
	copier.Copy(p, in)
	p.Items = p.ParseFromListItemYoutubeV1(in.Items)
}

func (p *PlaylistItem) ParseFromListItemYoutubeV1(in []*yt1Model.PlaylistItemDetail) []*PlaylistItemDetail {
	out := make([]*PlaylistItemDetail, 0)
	for _, v := range in {
		item := &PlaylistItemDetail{}
		copier.Copy(item, v.Snippet)
		item.VideoId = v.ContentDetails.VideoId
		publishedAt, _ := time.Parse(time.RFC3339, v.ContentDetails.VideoPublishedAt)
		item.PublishedAt = publishedAt.Format("2006-01-02 15:04:05")
		item.Thumbnail = getThumbnail(v.Snippet.Thumbnails)
		item.Author = v.Snippet.ChannelTitle
		out = append(out, item)
	}
	return out
}

type GetPlaylistItemRequest struct {
	Id string `json:"id"`
	models.PaginationRequest
}
