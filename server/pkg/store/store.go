package store

type Store interface {
	User() UserRepository
	Product() ProductRepository
	Employee() EmployeeRepository
	Order() OrderRepository
}
