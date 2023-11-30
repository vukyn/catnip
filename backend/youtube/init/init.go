package init

import (
	"catnip/backend/youtube/service"
)

type Init struct {
	Service service.IService
}

func NewInit() Init {
	service := service.InitService()
	return Init{
		Service: service,
	}
}
