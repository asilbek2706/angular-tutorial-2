import { Component, computed, effect, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { CartService } from '../services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { ICart } from '../interfaces/cart';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  imports: [MatCardModule, MatIconModule, MatButtonModule, CurrencyPipe, RouterLink],
  templateUrl: './shopping-cart.html',
  styleUrl: './shopping-cart.css',
})
export class ShoppingCart {
  private cartService = inject(CartService);
  private cartSignal = signal<ICart[]>([]);

  cart = this.cartSignal.asReadonly();

  totalPrice = computed(() =>
    this.cart().reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  );

  constructor() {
    this.loadCart();
    effect(() => {
      console.log('Cart updated:', this.cart());
    });
  }

  private loadCart() {
    this.cartService.getCart().subscribe({
      next: (data) => this.cartSignal.set(data),
    });
  }

  private updateQuantity(id: string, quantity: number) {
    this.cartService.updateQuantity(id, quantity).subscribe({
      next: (updatedCart) => {
        this.cartSignal.update((items) =>
          items.map((item) => (item.id === id ? { ...item, quantity } : item)),
        );
      },
    });
  }

  increase(cartId: string, currentQuantity: number) {
    this.updateQuantity(cartId, currentQuantity + 1);
  }

  decrease(cartId: string, currentQuantity: number) {
    if (currentQuantity > 1) {
      this.updateQuantity(cartId, currentQuantity - 1);
    }
  }

  remove(cartId: string) {
    this.cartService.removeFromCart(cartId).subscribe({
      next: () => {
        this.cartSignal.update((items) => items.filter((item) => item.id !== cartId));
      },
    });
  }

  clear() {
    this.cartSignal().forEach((cart) => {
      this.cartService.removeFromCart(cart.id).subscribe();
    });
    this.cartSignal.set([]);
  }
}
