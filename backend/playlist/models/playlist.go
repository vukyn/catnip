package models

import (
	yt1Model "catnip/backend/youtube/models"
	"fmt"
	"strconv"
	"time"

	yt2Model "github.com/kkdai/youtube/v2"
	"github.com/senseyeio/duration"

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

type PlaylistItem struct {
	Title       string `json:"title"`
	Position    int    `json:"position"`
	Description string `json:"description"`
	VideoId     string `json:"video_id"`
	Thumbnail   string `json:"thumbnail"`
	PublishedAt string `json:"published_at"`
	Author      string `json:"author"`
}

func (p *PlaylistItem) ParseFromListItemYoutubeV1(in []*yt1Model.PlaylistItem) []*PlaylistItem {
	out := make([]*PlaylistItem, 0)
	for _, v := range in {
		item := &PlaylistItem{}
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

func getThumbnail(in *yt1Model.Thumbnails) string {
	if in.Maxres != nil {
		return in.Maxres.Url
	} else if in.Standard != nil {
		return in.Standard.Url
	} else if in.High != nil {
		return in.High.Url
	} else if in.Default != nil {
		return in.Default.Url
	} else {
		return ""
	}
}

type Video struct {
	Id           string   `json:"id"`
	Title        string   `json:"title"`
	Duration     string   `json:"duration"`
	Caption      string   `json:"caption"`
	ViewCount    int64    `json:"view_count"`
	LikeCount    int64    `json:"like_count"`
	CommentCount int64    `json:"comment_count"`
	ChannelId    string   `json:"channel_id"`
	ChannelTitle string   `json:"channel_title"`
	Description  string   `json:"description"`
	PublishedAt  string   `json:"published_at"`
	Thumbnail    string   `json:"thumbnail"`
	Tags         []string `json:"tags"`
}

func (p *Video) ParseFromYoutubeV1(in *yt1Model.Video) {
	likeCount, _ := strconv.ParseInt(in.Statistics.LikeCount, 10, 64)
	viewCount, _ := strconv.ParseInt(in.Statistics.ViewCount, 10, 64)
	commentCount, _ := strconv.ParseInt(in.Statistics.CommentCount, 10, 64)
	duration, _ := duration.ParseISO8601(in.ContentDetails.Duration)
	publishedAt, _ := time.Parse(time.RFC3339, in.Snippet.PublishedAt)
	copier.Copy(p, in.Snippet)
	copier.Copy(p, in.ContentDetails)
	p.Id = in.Id
	p.LikeCount = likeCount
	p.ViewCount = viewCount
	p.CommentCount = commentCount
	p.Duration = fmt.Sprintf("%02d:%02d:%02d", duration.TH, duration.TM, duration.TS)
	p.Thumbnail = getThumbnail(in.Snippet.Thumbnails)
	p.PublishedAt = publishedAt.Format("2006-01-02 15:04:05")
}

func (p *Video) ParseFromYoutubeV2(in *yt2Model.Video) {
	p.Id = in.ID
	p.Title = in.Title
	p.ChannelId = in.ChannelID
	p.ChannelTitle = in.Author
	p.ViewCount = int64(in.Views)
	p.Duration = time.UnixMilli(0).UTC().Add(in.Duration).Format("15:04:05")
	p.Description = in.Description
	if len(in.CaptionTracks) > 0 {
		p.Caption = "true"
	} else {
		p.Caption = "false"
	}
	if len(in.Thumbnails) > 0 {
		p.Thumbnail = in.Thumbnails[len(in.Thumbnails)-1].URL
	}
}
