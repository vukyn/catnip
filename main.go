package main

import (
	"embed"
	"log"

	initPlaylist "catnip/backend/playlist/init"
	initStorage "catnip/backend/storage/init"
	initYoutube "catnip/backend/youtube/init"

	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
	"github.com/wailsapp/wails/v2/pkg/options/mac"
	"github.com/wailsapp/wails/v2/pkg/options/windows"
)

//go:embed all:frontend/dist
var assets embed.FS

//go:embed build/appicon.png
var icon []byte

func main() {
	// Create an instance of the app structure
	app := NewApp()

	// Init backend
	az, err := initAzBlob()
	if err != nil {
		panic(err)
	}
	storage := initStorage.NewInit(az)
	youtube := initYoutube.NewInit(storage)
	playlist := initPlaylist.NewInit(youtube)

	// Create application with options
	err = wails.Run(&options.App{
		Title:     "Catnip",
		Width:     1024,
		Height:    640,
		MinWidth:  1280,
		MinHeight: 800,
		// MaxWidth:      1280,
		// MaxHeight:     800,
		DisableResize: false,
		Fullscreen:    false,
		Frameless:     false,
		// StartHidden:       false,
		HideWindowOnClose: false,
		BackgroundColour:  &options.RGBA{R: 27, G: 38, B: 54, A: 1},
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		// Menu:             nil,
		// Logger:           nil,
		// LogLevel:         logger.DEBUG,
		OnStartup:        app.startup,
		OnDomReady:       app.domReady,
		OnBeforeClose:    app.beforeClose,
		OnShutdown:       app.shutdown,
		WindowStartState: options.Normal,
		Bind: []interface{}{
			app,
			&playlist.Handler,
		},
		// Windows platform specific options
		Windows: &windows.Options{
			WebviewIsTransparent: false,
			WindowIsTranslucent:  false,
			DisableWindowIcon:    false,
			WebviewUserDataPath:  "",
			ZoomFactor:           1.0,
		},
		// Mac platform specific options
		Mac: &mac.Options{
			TitleBar: &mac.TitleBar{
				TitlebarAppearsTransparent: true,
				HideTitle:                  false,
				HideTitleBar:               false,
				FullSizeContent:            false,
				UseToolbar:                 false,
				HideToolbarSeparator:       true,
			},
			Appearance:           mac.NSAppearanceNameDarkAqua,
			WebviewIsTransparent: true,
			WindowIsTranslucent:  true,
			About: &mac.AboutInfo{
				Title:   "Catnip",
				Message: "",
				Icon:    icon,
			},
		},
	})

	if err != nil {
		log.Fatal(err)
	}
}

func initAzBlob() (*azblob.Client, error) {
	const (
		host = "https://gocleanarch.blob.core.windows.net/"
		key  = "vlBNqkY1znW2y7KDkyCvEN9MIIh9IAfF2nJF0LpskHk9vollScVvb4GZKYwcxSIZlK3xkF6WiNJ9+AStQtv9dQ=="
	)
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
