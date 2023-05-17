package controllers

import (
	"ecommerce/pkg/model"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
)

func HandleProductCreate() gin.HandlerFunc {
	type request struct {
		Name        string  `json:"name"`
		Image       string  `json:"image"`
		Description string  `json:"description"`
		Price       float32 `json:"price"`
		Quantity    int     `json:"quantity"`
		Category    string  `json:"category"`
	}

	return func(c *gin.Context) {
		req := &request{}
		if err := c.BindJSON(req); err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"req error": err.Error()})
			return
		}

		p := &model.Product{
			Name:        req.Name,
			Image:       req.Image,
			Description: req.Description,
			Price:       req.Price,
			Quantity:    req.Quantity,
			Category:    req.Category,
		}

		if err := st.Product().Create(p); err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, p)
	}
}

func HandleProductList() gin.HandlerFunc {
	return func(c *gin.Context) {

		products, err := st.Product().All()
		if err != nil {
			fmt.Println(err)
			c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusOK, products)
	}
}

func HandleUpdateProduct() gin.HandlerFunc {

	return func(c *gin.Context) {

	}
}
