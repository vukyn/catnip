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
	res := (&models.Playlist{})
	ytPlaylist, err := u.youtubeSv.GetPlaylistInfoV1(ctx, id)
	if err != nil {
		return nil, err
	}
	res.ParseFromYoutube(ytPlaylist)
	return res, nil
}
