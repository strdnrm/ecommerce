package sqlstore

import (
	"database/sql"
	"ecommerce/pkg/model"
	"ecommerce/pkg/store"

	"github.com/google/uuid"
)

type EmployeeRepository struct {
	store *Store
}

func (r *EmployeeRepository) Create(e *model.Employee) error {
	if err := e.Validate(); err != nil {
		return err
	}

	if err := e.BeforeCreate(); err != nil {
		return err
	}
	e.Id = uuid.New()
	_, err := r.store.db.NamedQuery(`
	INSERT INTO
	employee(id, name, lastname, email, phone_number, password_hash, role)
	VALUES (:id, :name, :lastname, :email, :phone_number, :password_hash, :role)
	RETURNING ID;
	`, e)
	if err != nil {
		return err
	}
	return nil
}

func (r *EmployeeRepository) FindByEmail(email string) (*model.Employee, error) {
	e := model.Employee{}
	err := r.store.db.Get(&e, `
	SELECT * FROM employee WHERE email = $1;
	`, email)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, store.ErrRecordNotFound
		}

		return nil, err
	}
	return &e, nil
}

func (r *EmployeeRepository) FindById(id string) (*model.Employee, error) {
	e := model.Employee{}
	err := r.store.db.Get(&e, `
	SELECT * FROM employee WHERE id = $1;
	`, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, store.ErrRecordNotFound
		}

		return nil, err
	}
	return &e, nil
}
