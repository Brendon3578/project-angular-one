import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product, ProductList } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseApiUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) {}

  getProducts(): Observable<ProductList> {
    return this.http.get<ProductList>(`${this.baseApiUrl}products`);
  }

  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseApiUrl}products/${id}`);
  }

  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(
      `${this.baseApiUrl}products/${product.id}`,
      product
    );
  }

  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(`${this.baseApiUrl}products`, product);
  }

  deleteProduct(id: string): Observable<Product> {
    return this.http.delete<Product>(`${this.baseApiUrl}products/${id}`);
  }
}
