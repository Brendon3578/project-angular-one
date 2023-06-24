import { Component, OnInit } from '@angular/core';
import { ProductService } from './../services/product.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../models/product.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  buttonAction: string = 'Criar novo produto';

  formRegisterProduct!: FormGroup;

  constructor(
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route = this.activatedRoute.snapshot.url[0].path;
    this.createForm();

    if (this.route === 'edit') {
      this.id = this.activatedRoute.snapshot.url[1].path;
      this.productService
        .getProductById(this.id)
        .subscribe((product: Product) => {
          this.product = product;
          this.formRegisterProduct.controls['name'].setValue(this.product.name);
          this.formRegisterProduct.controls['description'].setValue(
            this.product.description
          );
          this.formRegisterProduct.controls['imageUrl'].setValue(
            this.product.imageUrl
          );
          this.formRegisterProduct.controls['price'].setValue(
            this.product.price
          );
          this.formRegisterProduct.controls['reviews'].setValue(
            this.product.reviews
          );
          this.formRegisterProduct.controls['stars'].setValue(
            this.product.stars
          );

          this.title = `Editar produto`;
          this.buttonAction = 'Salvar alteração';
        });
    } else {
      // create new product
      this.isNewProduct = true;
      this.title = 'Adicionar novo produto';
    }
  }

  createForm() {
    this.formRegisterProduct = this.formBuilder.group({
      name: ['', [Validators.required]],
      description: ['', [Validators.required]],
      imageUrl: [''],

      price: [0, [Validators.required, Validators.min(1)]],
      stars: [0, [Validators.required, Validators.min(1)]],
      reviews: [0, [Validators.required, Validators.min(1)]],
    });
  }

  saveProduct() {
    // if(this.formRegisterProduct.touched)
    if (!(this.formRegisterProduct.dirty && this.formRegisterProduct.touched)) {
      return;
    }

    console.log(this.formRegisterProduct.valid);
    if (this.formRegisterProduct.valid) {
      const productData = this.formRegisterProduct.value;
      if (this.isNewProduct) {
        this.createProduct(productData);
      } else {
        this.updateProduct({ ...productData, id: this.id });
      }
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

  get password() {
    return this.formRegisterProduct.get('password');
  }
}
