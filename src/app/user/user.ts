import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user',
  templateUrl: './user.html',
  styleUrl: './user.css',
})
export class User {
  @Input() name: string = '';
  @Input() users: IUser[] = [];
  @Output() deleteUserEvent = new EventEmitter<IUser>();

  onDeleteUser(user: IUser) {
    this.deleteUserEvent.emit(user);
  }
}

export interface IUser {
  name: string;
  age: number;
  id: number;
}
