import product1 from "./assets/products/1.png";
import product2 from "./assets/products/2.png";
import product3 from "./assets/products/3.png";
import product4 from "./assets/products/4.webp";
import product5 from "./assets/products/5.png";
import product6 from "./assets/products/6.png";


let products = [];

export function setProducts(newProducts) {
  products = newProducts;
  console.log("aga" + products);
}

export function getProducts() {
  return products;
}

axios.get('http://localhost:8080/product/list')
  .then(response => {
    const data = response.data.map((item, i) => {
      const imageBytes = atob(item.image);
      return {
        id: i,
        uuid: item.id,
        image: imageBytes,
        name: item.name,
        description: item.description,
        price: item.price,
        category: item.category
      }   
    });
    setProducts(data);
    console.log(data);
  })
  .catch(error => {
    console.log(error);
  });


// export const PRODUCTS = getProducts()

// export const PRODUCTS =
// [
//   {
//     id: 1,
//     productName: "Apple IPhone 14",
//     description: "big nice cocks",
//     price: 999.0,
//     productImage: product1,
//   },
//   {
//     id: 2,
//     productName: "Macbook Pro 2022 (M1)",
//     description: "big nice cocks",
//     price: 1999.0,
//     productImage: product2,
//   },
//   {
//     id: 3,
//     productName: "Cannon M50 Camera",
//     description: "big nice cocks",
//     price: 699.0,
//     productImage: product3,
//   },
//   {
//     id: 4,
//     productName: "Apple IPad",
//     description: "big nice cocks",
//     price: 499.0,
//     productImage: product4,
//   },
//   {
//     id: 5,
//     productName: "LED Light Strips",
//     description: "big nice cocks",
//     price: 19.99,
//     productImage: product5,
//   },
//   {
//     id: 6,
//     productName: "Beats by Dre Headphones",
//     description: "big nice cocks",
//     price: 199.0,
//     productImage: product6,
//   },
// ];