package usecase

import (
	"catnip/backend/playlist/models"
	"context"
)

type IUseCase interface {
	GetPlaylistById(ctx context.Context, id string) (*models.Playlist, error)
	GetPlaylistItemByPlaylistId(ctx context.Context, id string) ([]*models.PlaylistItem, error)
}
