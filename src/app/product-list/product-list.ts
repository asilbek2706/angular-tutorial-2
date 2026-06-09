import { Component, inject } from '@angular/core';
import { ProductService } from '../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { ProductCard } from '../components/card/product-card/product-card';

@Component({
  selector: 'app-product-list',
  imports: [MatCardModule, MatGridListModule, ProductCard],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  productService = inject(ProductService);

  productList = toSignal(this.productService.getProducts(), {
    initialValue: [],
  });
}
