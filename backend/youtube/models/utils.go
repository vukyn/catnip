package models

import "strings"

type Thumbnail struct {
	Url    string `json:"url"`
	Width  int    `json:"width"`
	Height int    `json:"height"`
}

type Thumbnails struct {
	Default  *Thumbnail `json:"default"`
	Medium   *Thumbnail `json:"medium"`
	High     *Thumbnail `json:"high"`
	Standard *Thumbnail `json:"standard"`
	Maxres   *Thumbnail `json:"maxres"`
}

type ContentDetails struct {
	VideoId          string `json:"videoId"`
	VideoPublishedAt string `json:"videoPublishedAt"`
}

func GetTotal(in map[string]interface{}) int {
	total := 0
	if pageInfo, ok := in["pageInfo"].(map[string]interface{}); ok {
		if t, ok := pageInfo["totalResults"].(int); ok {
			total = t
		} else {
			return total
		}
	}
	return total
}

func GetNextPageToken(in map[string]interface{}) string {
	nextPageToken := ""
	if nextPageToken, ok := in["nextPageToken"].(string); ok {
		return nextPageToken
	}
	return nextPageToken
}

func GetPrevPageToken(in map[string]interface{}) string {
	prevPageToken := ""
	if prevPageToken, ok := in["prevPageToken"].(string); ok {
		return prevPageToken
	}
	return prevPageToken
}

func QueryParams(in map[string]string) string {
	queryParams := make([]string, 0)
	for k, v := range in {
		queryParams = append(queryParams, k+"="+v)
	}
	return strings.Join(queryParams, "&")
}
