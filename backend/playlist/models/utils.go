package models

import (
	yt1Model "catnip/backend/youtube/models"
)

func getThumbnail(in *yt1Model.Thumbnails) string {
	if in.Maxres != nil {
		return in.Maxres.Url
	} else if in.Standard != nil {
		return in.Standard.Url
	} else if in.High != nil {
		return in.High.Url
	} else if in.Default != nil {
		return in.Default.Url
	} else {
		return ""
	}
}
