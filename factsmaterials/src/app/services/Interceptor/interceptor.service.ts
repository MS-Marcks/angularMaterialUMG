import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SecurityService } from './../security/security.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  constructor(private securityService: SecurityService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const Tokenreq = req.clone({
      setHeaders: {
        'access-token': 'bearer ' + this.securityService.gettoken()
      }
    });
    return next.handle(Tokenreq);
  }
}
