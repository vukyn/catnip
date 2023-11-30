package init

import (
	"catnip/backend/playlist/handler"
	"catnip/backend/playlist/usecase"
	initYt "catnip/backend/youtube/init"
)

type Init struct {
	Usecase usecase.IUseCase
	Handler handler.Playlist
}

func NewInit(
	initYt initYt.Init,
) Init {
	usecase := usecase.InitUsecase(initYt.Service)
	handler := handler.NewHandler(usecase)
	return Init{
		Usecase: usecase,
		Handler: handler,
	}
}
