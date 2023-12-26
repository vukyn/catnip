dev:
	wails dev

builds:
	wails build

builds-ins:
	wails build -nsis

generate:
	wails generate module

install-cmd:
	go install github.com/wailsapp/wails/v2/cmd/wails@latest

install-pkg:
	go get github.com/wailsapp/wails/v2@latest

tag:
	git tag -a v$(VERSION) -m "Release version $(VERSION)"
	git push origin v$(VERSION)