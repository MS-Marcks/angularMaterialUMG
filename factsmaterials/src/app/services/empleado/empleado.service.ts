import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Empleado } from './../../models/empleado/empleado';

@Injectable({
  providedIn: 'root'
})
export class EmpleadoService {

  private URI = 'https://apirestmaterial.herokuapp.com/api/';
  constructor(private httpClient: HttpClient) { }

  getEmpleadoSingle(id): Observable<Empleado>{
    return this.httpClient.get<Empleado>(this.URI + `empleados/${id}`);
  }

  getCliente(): Observable<Empleado[]>{
    return this.httpClient.get<Empleado[]>(this.URI + 'empleados');
  }

  postCliente(empleado): Observable<any>{
    return this.httpClient.post<any>(this.URI + 'empleados', empleado);
  }

  deleteCliente(id): Observable<any>{
    return this.httpClient.delete<any>(this.URI + `empleados/${id}`);
  }

  updateCliente(empleado): Observable<any>{
    return this.httpClient.put<any>(this.URI + `empleados/${empleado.id}`, empleado);
  }
}
