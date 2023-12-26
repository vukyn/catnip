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

func (u *usecase) GetPlaylistById(ctx context.Context, id string) (*playlistModel.Playlist, error) {
	res := &playlistModel.Playlist{}
	playlist, err := u.youtubeSv.GetPlaylistInfoV1(ctx, id)
	if err != nil {
		return nil, err
	}
	res.ParseFromYoutubeV1(playlist)
	return res, nil
}

func (u *usecase) GetPlaylistItemByPlaylistId(ctx context.Context, id string) ([]*playlistModel.PlaylistItem, error) {
	playlistItems, err := u.youtubeSv.GetPlaylistItemsV1(ctx, id)
	if err != nil {
		return nil, err
	}
	query.Where(playlistItems, func(item *youtubeModel.PlaylistItem) bool {
		return item.Snippet.Title != PRIVATE_TITLE
	})
	return (&playlistModel.PlaylistItem{}).ParseFromListItemYoutubeV1(playlistItems), nil
}

func (u *usecase) DownloadVideo(ctx context.Context, id, path string) (string, error) {
	res, err := u.youtubeSv.DownloadVideoV2(ctx, id)
	if err != nil {
		return "", err
	}
	return res.Url, nil
}
