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

func (p *Playlist) GetVideoById(id string) (*models.Video, error) {
	ctx := context.Background()
	return p.usecase.GetVideoById(ctx, id)
}

func (p *Playlist) GetPlaylistById(req *models.GetPlaylistRequest) (*models.Playlist, error) {
	ctx := context.Background()
	return p.usecase.GetPlaylistById(ctx, req)
}

func (p *Playlist) GetPlaylistItemByPlaylistId(req *models.GetPlaylistItemRequest) (*models.PlaylistItem, error) {
	ctx := context.Background()
	return p.usecase.GetPlaylistItemByPlaylistId(ctx, req)
}

func (p *Playlist) DownloadVideo(id, path string) (string, error) {
	ctx := context.Background()
	return p.usecase.DownloadVideo(ctx, id, path)
}
