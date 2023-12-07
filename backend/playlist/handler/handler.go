package handler

import (
	"catnip/backend/playlist/models"
	"catnip/backend/playlist/usecase"
	"context"
)

type Playlist struct {
	usecase usecase.IUseCase
}

func NewHandler(
	usecase usecase.IUseCase,
) Playlist {
	return Playlist{
		usecase: usecase,
	}
}

func (p *Playlist) GetPlaylistById(id string) (*models.Playlist, error) {
	ctx := context.Background()
	return p.usecase.GetPlaylistById(ctx, id)
}
