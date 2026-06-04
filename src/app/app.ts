import { CurrencyPipe } from '@angular/common';
import { Component, computed, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CurrencyPipe],
  templateUrl: './app.html',
})
export class App {
  price = signal(100);

  tax = computed(()=> this.price() * 0.2);  // Computed is only readonly, it cannot be set directly
  totalPrice = computed(() => this.price() + this.tax());

  applyDiscount(){
    const discount = this.price() * 0.1;
    this.price.set(this.price() - discount);
  }
}
