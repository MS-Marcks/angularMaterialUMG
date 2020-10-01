import { Component } from '@angular/core';
import { SecurityService } from './services/security/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'fact';

  constructor(private securityService: SecurityService, private router: Router) { }

  logein(): boolean {
    return this.securityService.logein();
  }
  logout(): void {
    this.securityService.loginOut();
    this.router.navigate(['login']);
  }
}
