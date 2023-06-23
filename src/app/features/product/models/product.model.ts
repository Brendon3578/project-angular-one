interface Product {
  id?: string;
  name: string;
  description: string;
  imageUrl?: string;
  price: number;
  stars: number;
  reviews: number;
}

interface ProductList extends Array<Product> {}

export { Product, ProductList };
