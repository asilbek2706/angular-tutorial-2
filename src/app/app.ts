import { Component } from '@angular/core';
import { IUser, User } from './user/user';

@Component({
  selector: 'app-root',
  imports: [User],
  standalone: true,
  template: `
    <section>
      <app-user [name]="name" [users]="users" (deleteUserEvent)="deleteUser($event)" />
    </section>
  `,
})
export class App {
  name: string = 'Asilbek Karomatov';

  users = [
    { name: 'Asilbek', age: 30, id: 1 },
    { name: 'Jane', age: 28, id: 2 },
    { name: 'Doe', age: 22, id: 3 },
  ];

  deleteUser(user: IUser) {
    this.users = this.users.filter((u) => u.id !== user.id);
  }
}
