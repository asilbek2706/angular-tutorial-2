import { Routes } from '@angular/router';
import { ProductList } from './product-list/product-list';
import { ShoppingCart } from './shopping-cart/shopping-cart';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    loadComponent: () => import('./product-list/product-list').then((m) => m.ProductList),
    title: 'Products',
  },
  {
    path: 'cart',
    loadComponent: () => import('./shopping-cart/shopping-cart').then((m) => m.ShoppingCart),
    title: 'Shopping Cart',
  }
];
 