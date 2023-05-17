package controllers

import (
	"ecommerce/pkg/model"
	"fmt"
	"net/http"

	"github.com/gin-contrib/sessions"
	"github.com/gin-gonic/gin"
)

func HandleEmpCreate() gin.HandlerFunc {
	type request struct {
		Name        string `json:"name"`
		Lastname    string `json:"lastname"`
		Email       string `json:"email"`
		Phonenumber string `json:"phone_number"`
		Password    string `json:"password"`
		Role        string `json:"role"`
	}

	return func(c *gin.Context) {
		req := &request{}
		if err := c.BindJSON(req); err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"req error": err.Error()})
			return
		}

		e := &model.Employee{
			Name:        req.Name,
			Lastname:    req.Lastname,
			Email:       req.Email,
			Phonenumber: req.Phonenumber,
			Password:    req.Password,
			Role:        req.Role,
		}

		if err := st.Employee().Create(e); err != nil {
			fmt.Println(err)
			c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
			return
		}

		e.Sanitize()
		c.JSON(http.StatusCreated, e)
	}
}

func HandleSessionsEmpCreate() gin.HandlerFunc {
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

		e, err := st.Employee().FindByEmail(req.Email)
		if err != nil || !e.ComparePassword(req.Password) {
			c.JSON(http.StatusUnauthorized, gin.H{"auth error": errIncorrectEmailOrPassword.Error()})
			return
		}

		eid := e.Id.String()

		if e.Role == sessionNameAdmin {
			session := sessions.DefaultMany(c, sessionNameAdmin)
			if session.Get("admin_id") != eid {
				session.Set("admin_id", eid)
				session.Save()
			}
			c.JSON(http.StatusOK, gin.H{
				"admin": session.Get("admin_id"),
			})
		} else if e.Role == sessionNameManager {
			session := sessions.DefaultMany(c, sessionNameManager)
			if session.Get("manager_id") != eid {
				session.Set("manager_id", eid)
				session.Save()
			}
			c.JSON(http.StatusOK, gin.H{
				"manager": session.Get("manager_id"),
			})
		}

	}
}
