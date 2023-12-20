package main

import (
	initYoutube "catnip/backend/youtube/init"
	initPlaylist "catnip/backend/playlist/init"
	"context"
	"fmt"

	"github.com/vukyn/kuery/log"
)

func main() {
	testPlaylistApi()
}

func testYoutubeApi() {
	ctx := context.Background()
	youtube := initYoutube.NewInit()
	// playlist, err := youtube.Service.GetPlaylistInfoV1(ctx, "PLHbj3Gti2iePSqHetd-OgitXLEe9mwH0L")
	// if err != nil {
	// 	panic(err)
	// }
	// fmt.Println(playlist)
	playlistItems, err := youtube.Service.GetPlaylistItemsV1(ctx, "PLHbj3Gti2iePSqHetd-OgitXLEe9mwH0L")
	if err != nil {
		panic(err)
	}
	fmt.Print(log.PrettyPrint(playlistItems))
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

