package server

import (
	"net/http"
	"os"
	"path/filepath"
	"runtime"

	"catnip/backend/models"

	"github.com/gin-gonic/gin"
)

// handleServeFile godoc
//
//	@Summary		get file
//	@Description	get file from computer
//	@Tags			FileService
//	@Produce		octet-stream
//	@Param			path	query		string	true	"file path"
//	@Success		200		{string}	string
//	@Failure		500		{string}	string
//	@Router			/file [get]
func handleServeFile(ctx *gin.Context) {
	path := ctx.Query("path")
	file, err := os.ReadFile(path)
	if err != nil {
		handleErr(ctx, err)
		return
	}
	ctx.Data(200, "application/octet-stream", file)
}

// handleLookupFolder godoc
//
//	@Summary		get files in folder
//	@Description	get all file in folder from computer
//	@Tags			FileService
//	@Produce		json
//	@Param			path	query		string	true	"folder path"
//	@Success		200		{object}	models.LookupFolderResponse
//	@Failure		500		{string}	string
//	@Router			/folder [get]
func handleLookupFolder(ctx *gin.Context) {
	path := ctx.Query("path")
	files, err := os.ReadDir(path)
	if err != nil {
		handleErr(ctx, err)
		return
	}

	fileInfos := make([]models.FileInfo, 0)
	folderInfos := make([]models.FolderInfo, 0)
	for _, f := range files {
		var err error
		var abs string

		info, err := f.Info()
		if err != nil {
			continue
		}
		if runtime.GOOS == "windows" {
			abs, err = filepath.Abs(path + "\\" + info.Name())
			if err != nil {
				handleErr(ctx, err)
				return
			}
		} else {
			abs, err = filepath.Abs(path + "/" + info.Name())
			if err != nil {
				handleErr(ctx, err)
				return
			}
		}
		if info.IsDir() {
			folderInfos = append(folderInfos, models.FolderInfo{
				Name: info.Name(),
				Path: abs,
			})
		} else {
			fileInfos = append(fileInfos, models.FileInfo{
				Name:      info.Name(),
				Path:      abs,
				Extension: filepath.Ext(info.Name()),
			})
		}
	}

	ctx.JSON(200, models.LookupFolderResponse{
		Files:   fileInfos,
		Folders: folderInfos,
	})
}

func handleErr(ctx *gin.Context, err error) {
	ctx.JSON(http.StatusBadRequest, gin.H{
		"error": gin.H{
			"code":    400,
			"message": err.Error(),
		},
	})
}
