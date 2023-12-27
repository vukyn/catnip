package usecase

import (
	"catnip/backend/playlist/models"
	"context"
)

type IUseCase interface {
	GetVideoById(ctx context.Context, id string) (*models.Video, error)
	GetPlaylistById(ctx context.Context, req *models.GetPlaylistRequest) (*models.Playlist, error)
	GetPlaylistItemByPlaylistId(ctx context.Context, req *models.GetPlaylistItemRequest) (*models.PlaylistItem, error)
	DownloadVideo(ctx context.Context, id, path string) (string, error)
}
