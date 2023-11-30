package service

import (
	"catnip/backend/youtube/models"
	"context"
)

type IService interface {
	GetYoutubePlaylistItemsV1(ctx context.Context, id string) (*models.Playlist, error)
	GetYoutubeVideoV1(ctx context.Context, id string) (*models.Video, error)
}
