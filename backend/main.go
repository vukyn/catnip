package main

import (
	initPlaylist "catnip/backend/playlist/init"
	playlistModel "catnip/backend/playlist/models"
	initStorage "catnip/backend/storage/init"
	initYoutube "catnip/backend/youtube/init"
	"context"
	"fmt"

	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
	"github.com/vukyn/kuery/log"
)

func main() {
	testPlaylistApi()
}

const (
	host = "https://gocleanarch.blob.core.windows.net/"
	key  = "vlBNqkY1znW2y7KDkyCvEN9MIIh9IAfF2nJF0LpskHk9vollScVvb4GZKYwcxSIZlK3xkF6WiNJ9+AStQtv9dQ=="
)

func initAzBlob() (*azblob.Client, error) {
	credential, err := azblob.NewSharedKeyCredential("gocleanarch", key)
	if err != nil {
		return nil, err
	}
	client, err := azblob.NewClientWithSharedKeyCredential(host, credential, nil)
	if err != nil {
		return nil, err
	}
	return client, nil
}

func testYoutubeApi() {
	ctx := context.Background()
	az, err := initAzBlob()
	if err != nil {
		panic(err)
	}
	storage := initStorage.NewInit(az)
	youtube := initYoutube.NewInit(storage)
	res, err := youtube.Service.GetVideoV2(ctx, "9QAevjELLMs")
	if err != nil {
		panic(err)
	}
	fmt.Print(log.PrettyPrint(res))
}

func testPlaylistApi() {
	ctx := context.Background()
	az, err := initAzBlob()
	if err != nil {
		panic(err)
	}
	storage := initStorage.NewInit(az)
	youtube := initYoutube.NewInit(storage)
	playlist := initPlaylist.NewInit(youtube)
	playlistItems, err := playlist.Usecase.GetPlaylistItemByPlaylistId(ctx, &playlistModel.GetPlaylistItemRequest{
		Id: "PLpVpfec_CeUcCm5Owo5pOU7YeLrErOzWf",
	})
	if err != nil {
		panic(err)
	}
	fmt.Print(log.PrettyPrint(playlistItems))
}

func testStorageApi() {
}
