package service

import (
	"catnip/backend/youtube/models"
	"context"

	"github.com/kkdai/youtube/v2"
)

type IService interface {
	// Get playlist info (offical api)
	GetPlaylistInfoV1(ctx context.Context, id string) (*models.Playlist, error)
	// Get playlist items (offical api)
	GetPlaylistItemsV1(ctx context.Context, id string) ([]*models.PlaylistItem, error)
	// Get video info (offical api)
	GetVideoV1(ctx context.Context, id string) (*models.Video, error)
	// Get video info (lib api)
	GetVideoV2(ctx context.Context, id string) (*youtube.Video, error)
	// Download and save local (lib api) (deprecated)
	DownloadVideoV1(ctx context.Context, id, path string) (*models.VideoDownload, error)
	// Download and save cloud storage (lib api)
	DownloadVideoV2(ctx context.Context, id string) (*models.VideoDownload, error)
}
