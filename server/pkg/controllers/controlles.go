package controllers

import (
	"ecommerce/pkg/store"
)

const (
	sessionNameAdmin   = "admin"
	sessionNameUser    = "user"
	sessionNameManager = "manager"
)

var (
	st store.Store
)

func SetUpDB(s store.Store) {
	st = s
}
