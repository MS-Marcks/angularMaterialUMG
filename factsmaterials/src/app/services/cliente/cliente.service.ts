import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Cliente } from './../../models/cliente/cliente';
import { Observable } from 'rxjs';
import { Factura } from './../../models/factura/factura';
// import { DetalleFactura } from './../../models/detalleFactura/detallefactura';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private URI = 'https://apirestmaterial.herokuapp.com/api/';
  constructor(private httpClient: HttpClient) { }

  /*getFacturas(id): Observable<Factura[]>{
    return this.httpClient.get<Factura[]>(this.URI + `clientes/${id}/facturas`);
  }*/

  getClienteSingle(id): Observable<Cliente> {
    return this.httpClient.get<Cliente>(this.URI + `clientes/${id}`);
  }

  /*getProductos(id): Observable<DetalleFactura[]>{
    return this.httpClient.get<DetalleFactura[]>(this.URI + `/facturas/${id}/productos`);
  }*/

  getCliente(): Observable<Cliente[]> {
    return this.httpClient.get<Cliente[]>(this.URI + 'clientes');
  }

  postCliente(cliente): Observable<any> {
    return this.httpClient.post<any>(this.URI + 'clientes', cliente);
  }

  deleteCliente(id): Observable<any> {
    return this.httpClient.delete<any>(this.URI + `clientes/${id}`);
  }

  updateCliente(cliente): Observable<any> {
    return this.httpClient.put<any>(this.URI + `clientes/${cliente.id}`, cliente);
  }
}
