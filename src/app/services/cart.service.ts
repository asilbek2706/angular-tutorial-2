import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { ICart } from '../interfaces/cart';
import { map, mergeMap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getCart(): Observable<ICart[]> {
    return this.http.get<ICart[]>(`${this.apiUrl}/cart`);
  }

  addToCart(cart: Omit<ICart, 'id'>, productId: number): Observable<boolean> {
    return this.getCart().pipe(
      mergeMap((carts) => {
        const existCart = carts.find((item) => item.product.id == productId);
        if (!existCart) {
          return this.addCart(cart).pipe(map(() => true));
        } else {
          return this.updateQuantity(existCart.id, existCart.quantity + 1).pipe(map(() => false));
        }
      }),
    );
  }

  addCart(cart: Omit<ICart, 'id'>): Observable<ICart> {
    return this.http.post<ICart>(`${this.apiUrl}/cart`, cart);
  }

  removeFromCart(cartId: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/cart/${cartId}`);
  }

  updateQuantity(cartId: string, quantity: number): Observable<ICart> {
    return this.http.patch<ICart>(`${this.apiUrl}/cart/${cartId}`, { quantity });
  }
}
