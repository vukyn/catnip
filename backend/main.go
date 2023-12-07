package main

import (
	initYoutube "catnip/backend/youtube/init"
	"context"
	"fmt"
)

func main() {
	testYoutubeApi()
}

func testYoutubeApi() {
	ctx := context.Background()
	youtube := initYoutube.NewInit()
	playlist, err := youtube.Service.GetPlaylistInfoV1(ctx, "PLHbj3Gti2iePSqHetd-OgitXLEe9mwH0L")
	if err != nil {
		panic(err)
	}
	fmt.Println(playlist)
}
