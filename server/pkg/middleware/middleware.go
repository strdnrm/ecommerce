package middleware

import (
	"ecommerce/pkg/store"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

var (
	st store.Store
)

func SetUpDB(s store.Store) {
	st = s
}

func AuthenticatUser() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.DefaultMany(c, "user")
		userid := session.Get("user_id")

		if userid == nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"err: ": "nauth",
			})
			c.AbortWithStatus(http.StatusUnauthorized)
			// c.Redirect(http.StatusFound, "/login")
			return
		}

		u, err := st.User().FindById(userid.(string))
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"err: ": "unauth not in bd",
			})
			return
		}

		c.Set("user", u)
		c.Next()
	}
}

func AuthenticatAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.DefaultMany(c, "admin")
		adminid := session.Get("admin_id")

		if adminid == nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"err: ": "nauth",
			})
			c.AbortWithStatus(http.StatusUnauthorized)
			// c.Redirect(http.StatusFound, "/login")
			return
		}

		a, err := st.Employee().FindById(adminid.(string))
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"err: ": "unauth not in bd",
			})
			return
		}

		c.Set("admin", a)
		c.Next()
	}
}

func AuthenticatManager() gin.HandlerFunc {
	return func(c *gin.Context) {
		session := sessions.DefaultMany(c, "manager")
		managerid := session.Get("manager_id")

		if managerid == nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"err: ": "nauth",
			})
			c.AbortWithStatus(http.StatusUnauthorized)
			// c.Redirect(http.StatusFound, "/login")
			return
		}

		m, err := st.Employee().FindById(managerid.(string))
		if err != nil {
			c.JSON(http.StatusUnauthorized, gin.H{
				"err: ": "unauth not in bd",
			})
			return
		}

		c.Set("manager", m)
		c.Next()
	}
}
