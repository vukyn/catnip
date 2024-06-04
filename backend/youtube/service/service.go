package service

import (
	"catnip/backend/constant"
	"catnip/backend/models"
	"catnip/backend/pkg"
	youtubeModel "catnip/backend/youtube/models"
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"strconv"

	storageModel "catnip/backend/storage/models"
	storageSv "catnip/backend/storage/service"

	"github.com/kkdai/youtube/v2"
	kuery "github.com/vukyn/kuery/http"
)

type service struct {
	storageSv storageSv.IService
}

func InitService(storageSv storageSv.IService) IService {
	return &service{
		storageSv: storageSv,
	}
}

// Get playlist info (offical api)
func (s *service) GetPlaylistInfoV1(ctx context.Context, id string) (*youtubeModel.Playlist, error) {
	part := "snippet"
	maxResults := 50
	client := &http.Client{}
	var res map[string]interface{}
	url := fmt.Sprintf("%v/playlists?part=%v&maxResults=%v&id=%v&key=%v", constant.YOUTUBE_API_URL, part, maxResults, id, constant.GOOGLE_KEY)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	body, err := kuery.MakeRequest(ctx, client, req, 0, 0, nil)
	if err != nil {
		return nil, err
	}
	if err := json.Unmarshal(body, &res); err != nil {
		return nil, err
	}
	playlist, err := pkg.DecodeMap[youtubeModel.Playlist](res["items"].([]interface{})[0].(map[string]interface{}))
	if err != nil {
		return nil, err
	}
	return playlist, nil
}

// Get playlist items (offical api)
func (s *service) GetPlaylistItemsV1(ctx context.Context, id string, page string, size int) (*youtubeModel.PlaylistItem, error) {
	client := &http.Client{}
	var res map[string]interface{}
	query := map[string]string{
		"maxResults": strconv.Itoa(size),
		"playlistId": id,
		"key":        constant.GOOGLE_KEY,
		"part":       "snippet,contentDetails",
	}
	if page != "" {
		query["pageToken"] = page
	}
	url := fmt.Sprintf("%v/playlistItems?%v", constant.YOUTUBE_API_URL, youtubeModel.QueryParams(query))
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	body, err := kuery.MakeRequest(ctx, client, req, 0, 0, nil)
	if err != nil {
		return nil, err
	}
	if err := json.Unmarshal(body, &res); err != nil {
		return nil, err
	}
	playlistItems := make([]*youtubeModel.PlaylistItemDetail, 0)
	for _, item := range res["items"].([]interface{}) {
		playlistItem, err := pkg.DecodeMap[youtubeModel.PlaylistItemDetail](item.(map[string]interface{}))
		if err != nil {
			return nil, err
		}
		playlistItems = append(playlistItems, playlistItem)
	}
	return &youtubeModel.PlaylistItem{
		Items: playlistItems,
		PaginationResponse: models.PaginationResponse{
			Size:  size,
			Next:  youtubeModel.GetNextPageToken(res),
			Prev:  youtubeModel.GetPrevPageToken(res),
			Total: youtubeModel.GetTotal(res),
		},
	}, nil
}

// Get video info (offical api)
func (s *service) GetVideoV1(ctx context.Context, id string) (*youtubeModel.Video, error) {
	part := "snippet,contentDetails,statistics"
	maxResults := 1
	client := &http.Client{}
	var res map[string]interface{}
	url := fmt.Sprintf("%v/videos?part=%v&maxResults=%v&id=%v&key=%v", constant.YOUTUBE_API_URL, part, maxResults, id, constant.GOOGLE_KEY)
	req, err := http.NewRequest("GET", url, nil)
	if err != nil {
		return nil, err
	}
	body, err := kuery.MakeRequest(ctx, client, req, 0, 0, nil)
	if err != nil {
		return nil, err
	}
	if err := json.Unmarshal(body, &res); err != nil {
		return nil, err
	}
	video, err := pkg.DecodeMap[youtubeModel.Video](res["items"].([]interface{})[0].(map[string]interface{}))
	if err != nil {
		return nil, err
	}

	return video, nil
}

// Get video info (lib api)
func (s *service) GetVideoV2(ctx context.Context, id string) (*youtube.Video, error) {
	client := youtube.Client{}
	video, err := client.GetVideo(id)
	if err != nil {
		return nil, err
	}
	return video, nil
}

// Download and save local (lib api)
func (s *service) DownloadVideoV1(ctx context.Context, id, path string) (*youtubeModel.VideoDownload, error) {
	client := youtube.Client{}

	video, err := client.GetVideo(id)
	if err != nil {
		return nil, err
	}

	formats := video.Formats.WithAudioChannels() // only get videos with audio
	stream, _, err := client.GetStream(video, &formats[0])
	if err != nil {
		return nil, err
	}
	defer stream.Close()

	downloadPath := fmt.Sprintf("%v/%v.mp3", path, id)
	file, err := os.Create(downloadPath)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	_, err = io.Copy(file, stream)
	if err != nil {
		return nil, err
	}
	return &youtubeModel.VideoDownload{
		VideoId: id,
		Url:     downloadPath,
	}, nil
}

// Download and save cloud storage (lib api)
func (s *service) DownloadVideoV2(ctx context.Context, id string) (*youtubeModel.VideoDownload, error) {
	client := youtube.Client{}

	video, err := client.GetVideo(id)
	if err != nil {
		return nil, err
	}

	fmt.Println("Downloading video: ", id)
	// 139: m4a, audio, 48k
	// 140: m4a, audio, 128k
	// 141: m4a, audio, 256k
	formats := video.Formats.Itag(140) // (m4a, audio, 128k)
	stream, _, err := client.GetStream(video, &formats[0])
	if err != nil {
		return nil, err
	}
	defer stream.Close()

	res, err := s.storageSv.Upload(ctx, &storageModel.UploadRequest{
		File:     stream,
		Filename: fmt.Sprintf("%v.m4a", id),
	})
	if err != nil {
		return nil, err
	}

	return &youtubeModel.VideoDownload{
		VideoId: id,
		Url:     res,
	}, nil
}
