package server

import (
	_ "catnip/docs"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	swaggerfiles "github.com/swaggo/files"
	ginSwagger "github.com/swaggo/gin-swagger"
)

func StartHTTP() {
	// init gin
	r := gin.Default()
	r.Use(cors.Default())

	// add route
	initSwagger(r)
	r.GET("/file", handleServeFile)
	r.GET("/folder", handleLookupFolder)

	// run server
	r.Run(":3001")
}

func initSwagger(r *gin.Engine) {
	r.GET("/swagger/*any", ginSwagger.WrapHandler(swaggerfiles.Handler))
}
