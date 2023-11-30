package service

type service struct {
}

func InitService() IService {
	return &service{}
}
