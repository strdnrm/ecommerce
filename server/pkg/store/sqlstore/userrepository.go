package sqlstore

import (
	"database/sql"
	"ecommerce/pkg/model"
	"ecommerce/pkg/store"

	"github.com/google/uuid"
)

type UserRepository struct {
	store *Store
}

// about to add context
func (r *UserRepository) Create(u *model.User) error {
	if err := u.Validate(); err != nil {
		return err
	}

	if err := u.BeforeCreate(); err != nil {
		return err
	}
	u.Id = uuid.New()
	_, err := r.store.db.NamedQuery(`
	INSERT INTO
	users(id, name, lastname, email, phone_number, password_hash)
	VALUES (:id, :name, :lastname, :email, :phone_number, :password_hash)
	RETURNING ID;
	`, u)
	if err != nil {
		return err
	}
	return nil
}

func (r *UserRepository) FindByEmail(email string) (*model.User, error) {
	u := model.User{}
	err := r.store.db.Get(&u, `
	SELECT * FROM users WHERE email = $1;
	`, email)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, store.ErrRecordNotFound
		}

		return nil, err
	}
	return &u, nil
}

func (r *UserRepository) FindById(id string) (*model.User, error) {
	u := model.User{}
	err := r.store.db.Get(&u, `
	SELECT * FROM users WHERE id = $1;
	`, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, store.ErrRecordNotFound
		}

		return nil, err
	}
	return &u, nil
}
