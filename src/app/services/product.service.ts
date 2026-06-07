import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IProduct } from '../interfaces/product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getProducts():Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.apiUrl}/products`);
  }
}
