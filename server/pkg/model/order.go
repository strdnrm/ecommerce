package model

import (
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type Order struct {
	Id            uuid.UUID `json:"id" db:"id"`
	Date          string    `json:"date" db:"date"`
	Status        string    `json:"status" db:"status"`
	TotalPrice    int       `json:"total_price" db:"total_price"`
	UserID        uuid.UUID `json:"user_id" db:"user_id"`
	Products      []Product `json:"products" db:"products"`
	ProductsCount []int     `json:"products_count"`
}

func (o *Order) Validate() error {
	validate := validator.New()
	err := validate.Struct(o)
	if err != nil {
		return err
	}
	return nil
}
