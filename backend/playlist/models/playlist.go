package models

type Playlist struct {
	Id        string `json:"id"`
	Title     string `json:"title"`
	Thumbnail string `json:"thumb"`
	Author    string `json:"author"`
	Views     string `json:"views"`
	Duration  string `json:"duration"`
}
