package models

type FileInfo struct {
	Name      string `json:"name"`
	Path      string `json:"path"`
	Extension string `json:"extension"`
}

type FolderInfo struct {
	Name string `json:"name"`
	Path string `json:"path"`
}

type LookupFolderResponse struct {
	Files   []FileInfo   `json:"files"`
	Folders []FolderInfo `json:"folders"`
}
