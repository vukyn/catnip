package service

import (
	"catnip/backend/storage/models"
	"context"
)

type IService interface {
	Upload(ctx context.Context, req *models.UploadRequest) (string, error)
}
