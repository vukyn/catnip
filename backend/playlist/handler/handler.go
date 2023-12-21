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

func (p *Playlist) GetPlaylistItemByPlaylistId(id string) ([]*models.PlaylistItem, error) {
	ctx := context.Background()
	return p.usecase.GetPlaylistItemByPlaylistId(ctx, id)
}

func (p *Playlist) DownloadVideo(id, path string) (string, error) {
	ctx := context.Background()
	return p.usecase.DownloadVideo(ctx, id, path)
}
