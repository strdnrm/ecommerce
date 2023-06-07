package store

import "ecommerce/pkg/model"

type UserRepository interface {
	Create(*model.User) error
	FindById(string) (*model.User, error)
	FindByEmail(string) (*model.User, error)
}

type ProductRepository interface {
	Create(*model.Product) error
	FindById(string) (*model.Product, error)
	All() (*[]model.Product, error)
	GetCategories() (*[]string, error)
}

type EmployeeRepository interface {
	Create(*model.Employee) error
	FindByEmail(string) (*model.Employee, error)
	FindById(string) (*model.Employee, error)
}

type OrderRepository interface {
	Create(*model.Order) error
	GetAll() ([]model.Order, error)
}
