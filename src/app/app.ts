import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
})
export class App {
  count = signal(0);

  readonlyCount = this.count.asReadonly();

  increment() {
    this.count.update((c) => c + 1);
  }

  decrement() {
    if (this.count() > 0) this.count.update((c) => c - 1);
  }

  reset() {
    this.count.set(0);
  }
}
