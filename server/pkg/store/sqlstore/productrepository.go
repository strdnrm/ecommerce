package sqlstore

import (
	"database/sql"
	"ecommerce/pkg/model"
	"ecommerce/pkg/store"

	"github.com/google/uuid"
)

type ProductRepository struct {
	store *Store
}

func (r *ProductRepository) Create(p *model.Product) error {
	if err := p.Validate(); err != nil {
		return err
	}
	p.Id = uuid.New()
	_, err := r.store.db.NamedQuery(`
	INSERT INTO
	product(id, image, name, description, price, quantity, category)
	VALUES (:id, :image, :name, :description, :price, :quantity, :category)
	RETURNING ID;
	`, p)
	if err != nil {
		return err
	}
	return nil
}

func (r *ProductRepository) SetQuantity(p *model.Product) error {
	if err := p.Validate(); err != nil {
		return err
	}
	p.Id = uuid.New()
	_, err := r.store.db.NamedQuery(`
	INSERT INTO
	product(id, name, description, price, quantity, category)
	VALUES (:id, :name, :description, :price, :quantity, :category)
	RETURNING ID;
	`, p)
	if err != nil {
		return err
	}
	return nil
}

func (r *ProductRepository) All() (*[]model.Product, error) {
	p := []model.Product{}
	err := r.store.db.Select(&p, `
	SELECT * FROM product;
	`)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, store.ErrRecordNotFound
		}

		return nil, err
	}
	return &p, nil
}

func (r *ProductRepository) FindById(id string) (*model.Product, error) {
	p := model.Product{}
	err := r.store.db.Get(&p, `
	SELECT * FROM product WHERE id = $1;
	`, id)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, store.ErrRecordNotFound
		}

		return nil, err
	}
	return &p, nil
}
