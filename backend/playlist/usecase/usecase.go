package usecase

import (
	playlistModel "catnip/backend/playlist/models"
	youtubeModel "catnip/backend/youtube/models"
	youtubeSv "catnip/backend/youtube/service"
	"context"

	"github.com/vukyn/kuery/query"
)

const PRIVATE_TITLE = "Private video"

type usecase struct {
	youtubeSv youtubeSv.IService
}

func InitUsecase(
	youtubeSv youtubeSv.IService,
) IUseCase {
	return &usecase{
		youtubeSv: youtubeSv,
	}
}

func (u *usecase) GetVideoById(ctx context.Context, id string) (*playlistModel.Video, error) {
	res := &playlistModel.Video{}
	video, err := u.youtubeSv.GetVideoV1(ctx, id)
	if err != nil {
		return nil, err
	}
	res.ParseFromYoutubeV1(video)
	return res, nil
}

func (u *usecase) GetPlaylistById(ctx context.Context, req *playlistModel.GetPlaylistRequest) (*playlistModel.Playlist, error) {
	res := &playlistModel.Playlist{}
	playlist, err := u.youtubeSv.GetPlaylistInfoV1(ctx, req.Id)
	if err != nil {
		return nil, err
	}
	res.ParseFromYoutubeV1(playlist)
	return res, nil
}

func (u *usecase) GetPlaylistItemByPlaylistId(ctx context.Context, req *playlistModel.GetPlaylistItemRequest) (*playlistModel.PlaylistItem, error) {
	pageToken := ""
	if req.PageToken != nil {
		pageToken = *req.PageToken
	}
	size := 10
	if req.Size != nil {
		size = *req.Size
	}
	playlistItems, err := u.youtubeSv.GetPlaylistItemsV1(ctx, req.Id, pageToken, size)
	if err != nil {
		return nil, err
	}
	playlistItems.Items = query.Where(playlistItems.Items, func(item *youtubeModel.PlaylistItemDetail) bool {
		return item.Snippet.Title != PRIVATE_TITLE
	})
	res := &playlistModel.PlaylistItem{}
	res.ParseYoutubeV1(playlistItems)
	return res, nil
}

func (u *usecase) DownloadVideo(ctx context.Context, id, path string) (string, error) {
	res, err := u.youtubeSv.DownloadVideoV2(ctx, id)
	if err != nil {
		return "", err
	}
	return res.Url, nil
}
