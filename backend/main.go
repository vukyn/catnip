package main

import (
	initPlaylist "catnip/backend/playlist/init"
	initYoutube "catnip/backend/youtube/init"
	"context"
	"fmt"

	"github.com/vukyn/kuery/log"
)

func main() {
	testYoutubeApi()
}

func testYoutubeApi() {
	ctx := context.Background()
	youtube := initYoutube.NewInit()
	res, err := youtube.Service.DownloadVideoV1(ctx, "B9otsRRe0BE", "F:\\Code\\golang\\moo-windows")
	if err != nil {
		panic(err)
	}
	fmt.Print(log.PrettyPrint(res))
}

func testPlaylistApi() {
	ctx := context.Background()
	youtube := initYoutube.NewInit()
	playlist := initPlaylist.NewInit(youtube)
	playlistItems, err := playlist.Usecase.GetPlaylistItemByPlaylistId(ctx, "PLHbj3Gti2iePSqHetd-OgitXLEe9mwH0L")
	if err != nil {
		panic(err)
	}
	fmt.Print(log.PrettyPrint(playlistItems))
}
