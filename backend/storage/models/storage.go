package models

import "io"

type UploadRequest struct {
	File      io.Reader
	Filename  string
	Overwrite bool
}
