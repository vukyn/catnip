package usecase

import (
	"catnip/backend/playlist/models"
	"context"
)

type IUseCase interface {
	GetById(ctx context.Context, id string) ([]*models.Playlist, error)
}
