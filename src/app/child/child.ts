import { Component, computed, Input, signal } from '@angular/core';

@Component({
  selector: 'app-child',
  imports: [],
  templateUrl: './child.html',
  standalone: true,
})
export class Child {
  private _name = signal('');

  @Input()
  set nameInput(value: string) {
    this._name.set(value);
  }

  name = computed(() => this._name());
}
