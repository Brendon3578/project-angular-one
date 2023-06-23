import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product, ProductList } from '../models/product.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {
  constructor(private productService: ProductService, private router: Router) {}

  products!: ProductList;

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    });
  }

  selectProduct(product: Product) {
    this.router.navigate(['product', 'edit', product.id]);
  }

  createNewProduct() {
    this.router.navigate(['product', 'create']);
  }

  deleteProduct(product: Product) {
    if (!product.id) {
      alert('Produto não tem um Identificador, um ID!');
      return;
    }
    this.productService.deleteProduct(product.id).subscribe(() => {
      alert('Produto deletado com sucesso.');
      this.router.navigate([this.router.url]);
    });
  }
}
