package init

import (
	"catnip/backend/youtube/service"
	initStorage "catnip/backend/storage/init"
)

type Init struct {
	Service service.IService
}

func NewInit(initStorage initStorage.Init) Init {
	service := service.InitService(initStorage.Service)
	return Init{
		Service: service,
	}
}
