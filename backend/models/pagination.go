package models

type PaginationRequest struct {
	Page      *int    `json:"page"`
	PageToken *string `json:"page_token"`
	Size      *int    `json:"size"`
}

type PaginationResponse struct {
	Total int    `json:"total"`
	Page  int    `json:"page"`
	Size  int    `json:"size"`
	Prev  string `json:"prev"`
	Next  string `json:"next"`
}
