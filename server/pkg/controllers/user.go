package controllers

import (
	"ecommerce/pkg/model"
	"errors"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

var (
	errIncorrectEmailOrPassword = errors.New("incorrect email or password")
)

func HandleUserCreate() gin.HandlerFunc {
	type request struct {
		Name        string `json:"name"`
		Lastname    string `json:"lastname"`
		Email       string `json:"email"`
		Phonenumber string `json:"phone_number"`
		Password    string `json:"password"`
	}

	return func(c *gin.Context) {
		req := &request{}
		if err := c.BindJSON(req); err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"req error": err.Error()})
			return
		}

		u := &model.User{
			Name:        req.Name,
			Lastname:    req.Lastname,
			Email:       req.Email,
			Phonenumber: req.Phonenumber,
			Password:    req.Password,
		}

		if err := st.User().Create(u); err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
			return
		}

		u.Sanitize()
		c.JSON(http.StatusCreated, u)
	}
}

func HandleSessionsCreate() gin.HandlerFunc {
	type request struct {
		Email    string `json:"email"`
		Password string `json:"password"`
	}

	return func(c *gin.Context) {
		req := &request{}

		if err := c.BindJSON(req); err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"req error": err.Error()})
			return
		}

		u, err := st.User().FindByEmail(req.Email)
		if err != nil || !u.ComparePassword(req.Password) {
			c.JSON(http.StatusUnauthorized, gin.H{"auth error": errIncorrectEmailOrPassword.Error()})
			return
		}

		uid := u.Id.String()

		session := sessions.DefaultMany(c, sessionNameUser)
		if session.Get("user_id") != uid {
			session.Set("user_id", uid)
			session.Save()
		}
		// sessionAdmin := sessions.DefaultMany(c, sessionNameAdmin)
		// if sessionAdmin.Get("hello") != "world?" {
		// 	sessionAdmin.Set("hello", "world?")
		// 	sessionAdmin.Save()
		// }
		// c.SetCookie("user_id", u.Id.String(), 3600, "/", "", false, true)
		c.JSON(http.StatusOK, gin.H{
			"user": session.Get("user_id"),
			// "admin": sessionB.Get("hello"),
		})
	}
}

func HandleWhoami() gin.HandlerFunc {
	return func(c *gin.Context) {
		u := c.MustGet("user").(*model.User)
		c.JSON(http.StatusOK, gin.H{
			"user": u,
		})
	}
}
