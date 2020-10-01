import { Injectable } from '@angular/core';
import { DetalleFactura } from './../../models/factura/detallefactura';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { DetalleFacturaProducto } from './../../models/factura/detallefacturaProducto';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {
  private URI = 'https://apirestmaterial.herokuapp.com/api/';
  constructor(private httpClient: HttpClient) { }

  postFactura(element): Observable<any> {
    return this.httpClient.post<any>(this.URI + 'facturas', element);
  }

  postFacturaDetalle(element, id): Observable<any> {
    return this.httpClient.post<any>(this.URI + `facturas/${id}/detalle`, element);
  }

  deleteFacturaDetalle(id): Observable<any> {
    return this.httpClient.delete<any>(this.URI + `facturas/${id}/detalle`);
  }

  getFacturaDetalle(id): Observable<DetalleFacturaProducto[]> {
    return this.httpClient.get<DetalleFacturaProducto[]>(this.URI + `facturas/${id}/productos`);
  }

  getFacturas(): Observable<DetalleFactura[]> {
    return this.httpClient.get<DetalleFactura[]>(this.URI + 'facturas');
  }
  PatchFactura(element): Observable<any> {
    return this.httpClient.patch<any>(this.URI + `facturas/${element.id}`, element);
  }

  updateFactura(element): Observable<any> {
    return this.httpClient.put<any>(this.URI + `facturas/${element.id}`, element);
  }
  deleteFactura(id): Observable<any> {
    return this.httpClient.delete<any>(this.URI + `facturas/${id}`);
  }


}
