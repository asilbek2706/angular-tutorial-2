import { Component } from '@angular/core';
import { Child } from './child/child';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  imports: [Child],
})
export class App {}
