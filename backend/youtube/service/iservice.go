package service

import (
	"catnip/backend/youtube/models"
	"context"
)

type IService interface {
	GetPlaylistInfoV1(ctx context.Context, id string) (*models.Playlist, error)
	// GetPlaylistItemsV1(ctx context.Context, id string) ([]*models.PlaylistItems, error)
	GetVideoV1(ctx context.Context, id string) (*models.Video, error)
}