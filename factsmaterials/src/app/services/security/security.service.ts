import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class SecurityService {
  private URI = "https://apirestmaterial.herokuapp.com/api/";

  constructor(private http: HttpClient) { }

  login(user) {
    return this.http.post<any>(this.URI + 'login', user);
  }

  loginOut() {
    localStorage.removeItem('token');
  };

  logein() {
    return !!localStorage.getItem('token');
  }

  gettoken(){
    return localStorage.getItem('token');
  }
}
