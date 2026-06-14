import { Component, computed, inject, signal } from '@angular/core';
import { ProductService } from '../services/product.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ProductCard } from '../components/card/product-card/product-card';
import { MatButtonModule } from '@angular/material/button';
import { IProduct } from '../interfaces/product';

@Component({
  selector: 'app-product-list',
  imports: [
    MatCardModule,
    MatGridListModule,
    ProductCard,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
  ],
  templateUrl: './product-list.html',
  styleUrl: './product-list.css',
})
export class ProductList {
  productService = inject(ProductService);

  search = signal('');
  selectedCategory = signal('');

  productList = toSignal(this.productService.getProducts(), {
    initialValue: [] as IProduct[],
  });

  filteredProducts = computed(() => {
    const searchTerm = this.search().toLowerCase();
    const category = this.selectedCategory();

    const products = this.productList() ?? [];

    return products.filter((product) => {
      const matchesSearch = product?.title?.toLowerCase().includes(searchTerm);
      const matchesCategory = category ? product?.category === category : true;

      return matchesSearch && matchesCategory;
    });
  });

  categories = computed(() => {
    const categorySet = new Set<string>();

    this.productList()?.forEach((product) => {
      if (product?.category) categorySet.add(product.category);
    });
    return Array.from(categorySet);
  });

  resetFilters() {
    this.search.set('');
    this.selectedCategory.set('');
  }
}
