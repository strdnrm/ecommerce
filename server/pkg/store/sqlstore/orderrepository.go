package sqlstore

import (
	"ecommerce/pkg/model"

	"github.com/google/uuid"
)

type OrderRepository struct {
	store *Store
}

func (r *OrderRepository) Create(o *model.Order) error {
	o.Id = uuid.New()

	tx, err := r.store.db.Beginx()
	if err != nil {
		return err
	}

	_, err = tx.NamedExec(`
		INSERT INTO orders (id, date, status, totalprice, id_user)
		VALUES (:id, :date, :status, :totalprice, :id_user)
		`, &o)
	if err != nil {
		tx.Rollback()
		return err
	}

	for i, product := range o.Products {
		_, err = tx.NamedExec(`INSERT INTO order_detail (id_order, id_product, quantity)
                                VALUES (:id_order, :id_product, :quantity)`,
			map[string]interface{}{
				"id_order":   o.Id,
				"id_product": product.Id,
				"quantity":   o.ProductsCount[i],
			})
		if err != nil {
			tx.Rollback()
			return err
		}
	}

	err = tx.Commit()
	if err != nil {
		return err
	}

	return nil
}

func (r *OrderRepository) GetAll() ([]model.Order, error) {
	orders := []model.Order{}

	err := r.store.db.Select(&orders, "SELECT * FROM orders")
	if err != nil {
		return nil, err
	}

	for i := range orders {
		products := []model.Product{}
		err = r.store.db.Select(&products, `
			SELECT products.* FROM products
			JOIN order_detail ON products.id = order_detail.id_product
			WHERE order_detail.id_order = $1`,
			orders[i].Id)
		if err != nil {
			return nil, err
		}

		orders[i].Products = products
	}

	return orders, nil
}
