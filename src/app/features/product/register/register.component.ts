import { Component, OnInit } from '@angular/core';
import { ProductService } from './../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  id!: string;
  product!: Product;
  route: string = '';
  title: string = '';
  // flags
  isNewProduct: boolean = false;

  name: string = '';
  imageUrl: string | undefined = '';
  description: string = '';
  price: number = 0;
  stars: number = 0;
  reviews: number = 0;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route = this.activatedRoute.snapshot.url[0].path;
    if (this.route === 'edit') {
      this.id = this.activatedRoute.snapshot.url[1].path;
      this.productService
        .getProductById(this.id)
        .subscribe((product: Product) => {
          this.product = product;
          this.name = this.product.name;
          this.imageUrl = this.product.imageUrl;
          this.description = this.product.description;
          this.price = this.product.price;
          this.stars = this.product.stars;
          this.reviews = this.product.reviews;

          this.title = `Editar produto ${this.name}`;
        });
    } else {
      // create new product
      this.isNewProduct = true;
      this.title = 'Adicionar novo produto';
    }
  }

  saveProduct() {
    const productData: Product = {
      id: this.id,
      name: this.name,
      description: this.description,
      imageUrl: this.imageUrl,
      price: this.price,
      stars: this.stars,
      reviews: this.reviews,
    };

    if (this.isNewProduct) {
      this.createProduct(productData);
    } else {
      this.updateProduct(productData);
    }
  }

  updateProduct(productData: Product) {
    this.productService.updateProduct(productData).subscribe((res) => {
      this.router.navigate(['product', 'list']);
      console.log(res);
    });
  }

  createProduct(productData: Product) {
    this.productService.createProduct(productData).subscribe((res) => {
      console.log('Produto criaddo com sucesso');
      this.router.navigate(['product', 'list']);
    });
  }
}
