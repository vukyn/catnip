dev:
	wails dev

builds:
	wails build

generate:
	wails generate module

install-cmd:
	go install github.com/wailsapp/wails/v2/cmd/wails@latest

install-pkg:
	go get github.com/wailsapp/wails/v2@latest