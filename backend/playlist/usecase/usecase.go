package usecase

import (
	"catnip/backend/playlist/models"
	ytSv "catnip/backend/youtube/service"
	"context"
)

type usecase struct {
	ytSv ytSv.IService
}

func InitUsecase(
	ytSv ytSv.IService,
) IUseCase {
	return &usecase{
		ytSv: ytSv,
	}
}

func (u *usecase) GetById(ctx context.Context, id string) ([]*models.Playlist, error) {
	ytPlaylist, err := u.ytSv.GetYoutubePlaylistItemsV1(ctx, id)
	if err != nil {
		return nil, err
	}
	return (&models.Playlist{}).ParseFromListYoutube(ytPlaylist.Items), nil
}
