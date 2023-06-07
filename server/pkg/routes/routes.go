package routes

import (
	"ecommerce/pkg/controllers"
	"ecommerce/pkg/middleware"
	"ecommerce/pkg/store"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/sessions"
	"github.com/gin-contrib/sessions/cookie"
	"github.com/gin-gonic/gin"
)

func ConfigureRouter(s store.Store, sessionKey string) *gin.Engine {
	router := gin.Default()

	store := cookie.NewStore([]byte("secret")) //sessionKey
	sessionNames := []string{"user", "admin", "manager"}
	session := sessions.SessionsMany(sessionNames, store)

	//good enough???
	router.Use(cors.New(cors.Config{
		AllowOrigins:     []string{"http://localhost:3000"},
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"Origin", "Content-Type", "Accept", "Authorization", "Set-Cookie"},
		ExposeHeaders:    []string{"Content-Length", "Set-Cookie"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	router.Use(session)

	controllers.SetUpDB(s)
	middleware.SetUpDB(s)

	router.POST("/signup", controllers.HandleUserCreate())
	router.POST("/login", controllers.HandleSessionsCreate())

	products := router.Group("/product")
	products.GET("/list", controllers.HandleProductList())
	products.GET("/categories", controllers.HandleCategoriesList())
	products.POST("/create", middleware.AuthenticatAdmin(), controllers.HandleProductCreate())

	authorized := router.Group("/private")
	authorized.GET("/whoami", middleware.AuthenticatUser(), controllers.HandleWhoami())
	authorized.POST("/order", middleware.AuthenticatUser(), controllers.HandleWhoami())

	admin := router.Group("/admin")
	admin.POST("", controllers.HandleSessionsEmpCreate())

	admin.Use(middleware.AuthenticatAdmin())

	manager := router.Group("/manager")
	manager.GET("/", controllers.HandleSessionsEmpCreate())
	manager.Use(middleware.AuthenticatManager())

	// manager.POST("/orders")

	return router
}
