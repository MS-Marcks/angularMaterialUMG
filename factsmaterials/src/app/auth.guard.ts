import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './services/security/security.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private securityService: SecurityService,
    private router: Router
  ) { }
  canActivate(): boolean {
    if (this.securityService.logein()) {
      return true;
    } else {
      this.router.navigate(['login']);
      return false;
    }
  }
}
