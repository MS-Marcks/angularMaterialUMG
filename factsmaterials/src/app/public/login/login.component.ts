import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SecurityService } from './../../services/security/security.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  LoginFrom: FormGroup;

  nombre;
  password;

  constructor(private fb: FormBuilder, private serviceSecurity: SecurityService, private routes: Router) { }
  ngOnInit(): void {
    this.LoginFrom = this.fb.group({
      nombre: [this.nombre, Validators.required],
      password: [this.password, Validators.required]
    });
  }
  onSubmit(): void {
    this.serviceSecurity.login({ nombre: this.LoginFrom.value.nombre, password: this.LoginFrom.value.password }).subscribe(
      (res) => {
        if (typeof res.token !== 'undefined') {
          localStorage.setItem('token', res.token);
          this.routes.navigate(['cliente']);
        }
      }
    );
  }
}
