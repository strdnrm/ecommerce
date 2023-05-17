package model

import (
	"ecommerce/pkg/utils"

	"github.com/go-playground/validator/v10"
	"github.com/google/uuid"
	"golang.org/x/crypto/bcrypt"
)

type Employee struct {
	Id           uuid.UUID `json:"id" db:"id"`
	Name         string    `json:"name" db:"name" validate:"required"`
	Lastname     string    `json:"lastname" db:"lastname" validate:"required"`
	Email        string    `json:"email" db:"email" validate:"required,email"`
	Phonenumber  string    `json:"phone_number" db:"phone_number" validate:"required,e164"`
	Password     string    `json:"password,omitempty" db:"-" validate:"required,gte=6,lte=40"`
	PasswordHash string    `json:"-" db:"password_hash"`
	Role         string    `json:"role" db:"role"`
}

func (u *Employee) BeforeCreate() error {
	if len(u.Password) > 0 {
		enc, err := utils.EncryptString(u.Password)
		if err != nil {
			return err
		}

		u.PasswordHash = enc
	}
	return nil
}

func (u *Employee) Sanitize() {
	u.Password = ""
}

func (u *Employee) ComparePassword(password string) bool {
	return bcrypt.CompareHashAndPassword([]byte(u.PasswordHash), []byte(password)) == nil
}

func (u *Employee) Validate() error {
	validate := validator.New()
	err := validate.Struct(u)
	if err != nil {
		return err
	}
	return nil
}
