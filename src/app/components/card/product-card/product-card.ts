import { Component, inject, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { TruncatePipe } from '../../../pipes/truncate-pipe';
import { IProduct } from '../../../interfaces/product';
import { CartService } from '../../../services/cart.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-product-card',
  imports: [MatCardModule, TruncatePipe, MatSnackBarModule],
  templateUrl: './product-card.html',
  styleUrls: ['./product-card.css'],
  standalone: true,
})
export class ProductCard {
  @Input() item: IProduct = {} as IProduct;
  private cartService = inject(CartService);
  private _snackBar = inject(MatSnackBar);

  addCart(product: IProduct): void {
    const cartItem = {
      product,
      quantity: 1,
    };
    this.cartService.addToCart(cartItem, product.id).subscribe((isAdded) => {
      if (isAdded) {
        this._snackBar.open('Product added to cart', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }else{
        this._snackBar.open('Product quantity updated', 'Close', {
          duration: 2000,
          horizontalPosition: 'right',
          verticalPosition: 'bottom',
        });
      }
    });
  }
}
