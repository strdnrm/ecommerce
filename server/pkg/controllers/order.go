package controllers

import (
	"ecommerce/pkg/model"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
)

func HandleOrderCreate() gin.HandlerFunc {
	type request struct {
		Date          string          `json:"date"`
		Status        string          `json:"status"`
		TotalPrice    int             `json:"total_price"`
		UserID        uuid.UUID       `json:"user_id"`
		Products      []model.Product `json:"products"`
		ProductsCount []int           `json:"products_count"`
	}

	return func(c *gin.Context) {
		req := &request{}
		if err := c.BindJSON(req); err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"req error": err.Error()})
			return
		}

		o := &model.Order{
			Date:          req.Date,
			Status:        req.Status,
			TotalPrice:    req.TotalPrice,
			UserID:        req.UserID,
			Products:      req.Products,
			ProductsCount: req.ProductsCount,
		}

		if err := st.Order().Create(o); err != nil {
			c.JSON(http.StatusUnprocessableEntity, gin.H{"error": err.Error()})
			return
		}

		c.JSON(http.StatusCreated, o)
	}
}

func HandleOrderList() gin.HandlerFunc {
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
