package usecase

import (
	"catnip/backend/playlist/models"
	youtubeSv "catnip/backend/youtube/service"
	"context"
)

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

func (u *usecase) GetPlaylistById(ctx context.Context, id string) (*models.Playlist, error) {
	res := &models.Playlist{}
	ytPlaylist, err := u.youtubeSv.GetPlaylistInfoV1(ctx, id)
	if err != nil {
		return nil, err
	}
	res.ParseFromYoutube(ytPlaylist)
	return res, nil
}

func (u *usecase) GetPlaylistItemByPlaylistId(ctx context.Context, id string) ([]*models.PlaylistItem, error) {
	ytPlaylistItems, err := u.youtubeSv.GetPlaylistItemsV1(ctx, id)
	if err != nil {
		return nil, err
	}
	return (&models.PlaylistItem{}).ParseFromListItemYoutube(ytPlaylistItems), nil
}

func (u *usecase) DownloadVideo(ctx context.Context, id, path string) (string, error) {
	res, err := u.youtubeSv.DownloadVideoV2(ctx, id)
	if err != nil {
		return "", err
	}
	return res.Url, nil
}
