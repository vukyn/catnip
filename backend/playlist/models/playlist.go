package models

import (
	ytModel "catnip/backend/youtube/models"
)

type Playlist struct {
	Id        string `json:"id"`
	Title     string `json:"title"`
	Thumbnail string `json:"thumb"`
	Author    string `json:"author"`
}

func (p *Playlist) ParseFromYoutube(in *ytModel.PlaylistItem) {
	p.Id = in.Snippet.ResourceId.VideoId
	p.Title = in.Snippet.Title
	p.Thumbnail = in.Snippet.Thumbnails.Maxres.Url
	p.Author = in.Snippet.ChannelTitle
}

func (p *Playlist) ParseFromListYoutube(in []*ytModel.PlaylistItem) []*Playlist {
	out := make([]*Playlist, 0)
	for _, v := range in {
		playlist := &Playlist{}
		playlist.ParseFromYoutube(v)
		out = append(out, playlist)
	}
	return out
}
