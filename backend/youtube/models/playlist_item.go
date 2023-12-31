package models

import "catnip/backend/models"

type PlaylistItem struct {
	models.PaginationResponse
	Items []*PlaylistItemDetail `json:"items"`
}

type PlaylistItemDetail struct {
	Snippet struct {
		Title        string      `json:"title"`
		Position     int         `json:"position"`
		ChannelTitle string      `json:"channelTitle"`
		Description  string      `json:"description"`
		Thumbnails   *Thumbnails `json:"thumbnails"`
	} `json:"snippet"`
	ContentDetails *ContentDetails `json:"contentDetails"`
}
