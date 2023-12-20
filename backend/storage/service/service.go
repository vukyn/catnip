package service

import (
	"catnip/backend/storage/models"
	"context"
	"io"
	"os"
	"path"

	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
)

type service struct {
	azCli *azblob.Client
}

func InitService(azCli *azblob.Client) IService {
	return &service{
		azCli: azCli,
	}
}

const (
	HOST      = "https://gocleanarch.blob.core.windows.net/"
	CONTAINER = "catnip-media"
)

func (s *service) Upload(ctx context.Context, req *models.UploadRequest) (string, error) {

	// Destination
	file, err := os.Create(req.Filename)
	if err != nil {
		return "", err
	}

	defer func() {
		file.Close()
		os.Remove(req.Filename)
	}()

	// Copy
	if _, err := io.Copy(file, req.File); err != nil {
		return "", err
	}

	blobName := req.Filename
	if _, err := s.azCli.UploadFile(ctx, CONTAINER, blobName, file, &azblob.UploadBufferOptions{}); err != nil {
		return "", err
	}
	return path.Join(HOST, CONTAINER, blobName), nil
}
