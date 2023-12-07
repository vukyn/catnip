package service

import (
	"catnip/backend/constant"
	"catnip/backend/youtube/models"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"

	kuery "github.com/vukyn/kuery/http"
)

type service struct {
}

func InitService() IService {
	return &service{}
}

type playlistResponse struct {
	Snippet struct {
		Title        string `json:"title"`
		ChannelId    string `json:"channelId"`
		ChannelTitle string `json:"channelTitle"`
		Description  string `json:"description"`
		PublishedAt  string `json:"publishedAt"`
		ResourceId   struct {
			VideoId string `json:"videoId"`
		} `json:"resourceId"`
		Thumbnails struct {
			Default  models.Thumbnail `json:"default"`
			Medium   models.Thumbnail `json:"medium"`
			High     models.Thumbnail `json:"high"`
			Standard models.Thumbnail `json:"standard"`
			Maxres   models.Thumbnail `json:"maxres"`
		} `json:"thumbnails"`
	} `json:"snippet"`
}

type playlistItemsResponse struct {
	Items []struct {
		Snippet struct {
			Title       string `json:"title"`
			Position    int    `json:"position"`
			Description string `json:"description"`
			ResourceId  struct {
				VideoId string `json:"videoId"`
			} `json:"resourceId"`
		} `json:"snippet"`
	} `json:"items"`
}

func (s *service) GetYoutubePlaylistInfoV1(ctx context.Context, id string) (*models.Playlist, error) {
	part := "snippet"
	maxResults := 50
	client := &http.Client{}

	// Get playlist detail
	playlist, err := s.getPlaylistDetail(ctx, id, part, maxResults, client)
	if err != nil {
		return nil, err
	}
	// Get playlist items detail
	playlistItems, err := s.getPlaylistItems(ctx, id, part, maxResults, client)
	if err != nil {
		return nil, err
	}
	playlist.Items = playlistItems

	return playlist, nil
}

func (s *service) getPlaylistDetail(ctx context.Context, id string, part string, maxResults int, client *http.Client) (*models.Playlist, error) {
	playlist := &playlistResponse{}
	url := fmt.Sprintf("%v/playlists?part=%v&maxResults=%v&playlistId=%v&key=%v", constant.YOUTUBE_API_URL, part, maxResults, id, constant.GOOGLE_KEY)
	log.Print(url)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	res, err := kuery.MakeRequest(ctx, client, req, 0, 0, nil)
	if err != nil {
		return nil, err
	}
	if err := json.Unmarshal(res, playlist); err != nil {
		return nil, err
	}
	return &models.Playlist{}, nil
}

func (s *service) getPlaylistItems(ctx context.Context, id string, part string, maxResults int, client *http.Client) ([]*models.PlaylistItem, error) {
	playlistItems := &playlistItemsResponse{}
	resItems := make([]*models.PlaylistItem, 0)
	url := fmt.Sprintf("%v/playlistItems?part=%v&maxResults=%v&playlistId=%v&key=%v", constant.YOUTUBE_API_URL, part, maxResults, id, constant.GOOGLE_KEY)
	log.Print(url)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	res, err := kuery.MakeRequest(ctx, client, req, 0, 0, nil)
	if err != nil {
		return nil, err
	}
	if err := json.Unmarshal(res, playlistItems); err != nil {
		return nil, err
	}
	for _, item := range playlistItems.Items {
		resItems = append(resItems, &models.PlaylistItem{
			Title:       item.Snippet.Title,
			Position:    item.Snippet.Position,
			Description: item.Snippet.Description,
			VideoId:     item.Snippet.ResourceId.VideoId,
		})
	}
	return resItems, nil
}

func (s *service) GetYoutubeVideoV1(ctx context.Context, id string) (*models.Video, error) {
	part := "contentDetails,statistics,player"
	maxResults := 1
	client := &http.Client{}
	var video *models.Video

	req, err := http.NewRequest("GET", fmt.Sprintf("%v/videos?part=%v&maxResults=%v&id=%v&key=%v", constant.YOUTUBE_API_URL, part, maxResults, id, constant.GOOGLE_KEY), nil)
	if err != nil {
		return nil, err
	}
	res, err := kuery.MakeRequest(ctx, client, req, 0, 0, nil)
	if err != nil {
		return nil, err
	}

	if err := json.Unmarshal(res, video); err != nil {
		return nil, err
	}

	return video, nil
}
