package model

import (
	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
)

type Product struct {
	Id          uuid.UUID `json:"id" db:"id"`
	Image       string    `json:"image" db:"image"`
	Name        string    `json:"name" db:"name" validate:"required"`
	Description string    `json:"description" db:"description"`
	Price       float32   `json:"price" db:"price"`
	Quantity    int       `json:"quantity" db:"quantity"`
	Category    string    `json:"category" db:"category"`
}

func (p *Product) Validate() error {
	validate := validator.New()
	err := validate.Struct(p)
	if err != nil {
		return err
	}
	return nil
}
