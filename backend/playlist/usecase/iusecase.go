package usecase

import (
	"catnip/backend/playlist/models"
)

type IUseCase interface {
	PlaylistService(id string) ([]*models.Playlist, error)
}
