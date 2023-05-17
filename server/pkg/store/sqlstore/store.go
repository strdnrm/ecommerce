package sqlstore

import (
	"ecommerce/pkg/store"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"
)

type Store struct {
	db                 *sqlx.DB
	userRepository     *UserRepository
	productRepository  *ProductRepository
	employeeRepository *EmployeeRepository
	orderRepository    *OrderRepository
}

func New(db *sqlx.DB) *Store {
	return &Store{
		db: db,
	}
}

func (s *Store) User() store.UserRepository {
	if s.userRepository != nil {
		return s.userRepository
	}

	s.userRepository = &UserRepository{
		store: s,
	}

	return s.userRepository
}

func (s *Store) Product() store.ProductRepository {
	if s.productRepository != nil {
		return s.productRepository
	}

	s.productRepository = &ProductRepository{
		store: s,
	}

	return s.productRepository
}

func (s *Store) Employee() store.EmployeeRepository {
	if s.employeeRepository != nil {
		return s.employeeRepository
	}

	s.employeeRepository = &EmployeeRepository{
		store: s,
	}

	return s.employeeRepository
}

func (s *Store) Order() store.OrderRepository {
	if s.orderRepository != nil {
		return s.orderRepository
	}

	s.orderRepository = &OrderRepository{
		store: s,
	}

	return s.orderRepository
}
