import { Injectable } from '@angular/core';
import { Producto } from './../../models/producto/product';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private URI = 'https://apirestmaterial.herokuapp.com/api/';
  constructor(private httpClient: HttpClient) { }

  getproducto(id): Observable<Producto>{
    return this.httpClient.get<Producto>(this.URI + `productos/${id}`);
  }

  getCliente(): Observable<Producto[]>{
    return this.httpClient.get<Producto[]>(this.URI + 'productos');
  }

  postCliente(producto): Observable<any>{
    return this.httpClient.post<any>(this.URI + 'productos', producto);
  }

  deleteCliente(id): Observable<any>{
    return this.httpClient.delete<any>(this.URI + `productos/${id}`);
  }

  updateCliente(producto): Observable<any>{
    return this.httpClient.put<any>(this.URI + `productos/${producto.id}`, producto);
  }
}
