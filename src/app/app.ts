import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Navbar } from './components/shared/navbar/navbar';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, RouterLink],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
 }