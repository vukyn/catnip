package models

import "io"

type UploadRequest struct {
	File     io.Reader `json:"file"`
	Filename string    `json:"filename"`
}
