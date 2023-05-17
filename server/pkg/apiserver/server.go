package apiserver

import (
	"ecommerce/pkg/routes"
	"ecommerce/pkg/store"

	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type Server struct {
	Router *gin.Engine
	Logger *logrus.Logger
	Store  store.Store
}

func newServer(store store.Store, sessionKey string) *Server {
	s := &Server{
		Router: routes.ConfigureRouter(store, sessionKey), //gin.Default(),
		Logger: logrus.New(),
		Store:  store,
	}

	//routes.ConfigureRouter(s)
	// s.configureRouter()

	return s
}
