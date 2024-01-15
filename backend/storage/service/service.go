package service

import (
	"catnip/backend/storage/models"
	"context"
	"io"
	"net/http"
	"os"
	"path"
	"strings"

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

	blobName := req.Filename
	url := path.Join(HOST, CONTAINER, blobName)

	// Check if file exist and not allow overwrite
	if exist, err := s.exist(ctx, url); err != nil {
		return "", err
	} else if exist && !req.Overwrite {
		return url, nil
	}

	userDir, err := os.UserCacheDir() // C:\Users\YourUser\AppData\Local
	if err != nil {
		return "", err
	}

	// Write file in system is not allowed, so write to temp folder.
	tmpDir := userDir + "\\Temp\\catnip\\"
	if _, err := os.Stat(tmpDir); err != nil {
		// Create temp folder if not exist
		if err := os.MkdirAll(tmpDir, os.ModePerm); err != nil {
			return "", err
		}
	}

	// Destination
	filepath := tmpDir + req.Filename
	file, err := os.Create(filepath)
	if err != nil {
		return "", err
	}

	defer func() {
		file.Close()
		os.Remove(filepath)
	}()

	// Copy
	if _, err := io.Copy(file, req.File); err != nil {
		return "", err
	}

	if _, err := s.azCli.UploadFile(ctx, CONTAINER, blobName, file, &azblob.UploadBufferOptions{}); err != nil {
		return "", err
	}
	return url, nil
}

func (s *service) exist(ctx context.Context, url string) (bool, error) {
	res, err := http.Get(url)
	if err != nil {
		if strings.Contains(err.Error(), "no Host in request URL") {
			return false, nil
		}
		return false, err
	}
	return res.StatusCode == http.StatusOK, nil
}

/*
func UserHomeDir() string {
    if runtime.GOOS == "windows" {
        home := os.Getenv("HOMEDRIVE") + os.Getenv("HOMEPATH")
        if home == "" {
            home = os.Getenv("USERPROFILE")
        }
        return home
    }
    return os.Getenv("HOME")
}

func main() {
    homeDir := UserHomeDir()
    fmt.Println(homeDir + "\\AppData")
}
*/
