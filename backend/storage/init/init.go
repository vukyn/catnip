package init

import (
	"catnip/backend/storage/service"

	"github.com/Azure/azure-sdk-for-go/sdk/storage/azblob"
)

type Init struct {
	Service service.IService
}

func NewInit(azCli *azblob.Client) Init {
	service := service.InitService(azCli)
	return Init{
		Service: service,
	}
}
