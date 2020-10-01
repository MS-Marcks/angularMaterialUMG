import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { ClienteComponent } from './private/cliente/cliente.component';
import { EmpleadoComponent } from './private/empleado/empleado.component';
import { LoginComponent } from './public/login/login.component';
import { FacturaComponent } from './private/factura/factura.component';
import { DetalleComponent } from './private/detalle/detalle.component';

const routes: Routes = [
  { path: ' ', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'cliente', component: ClienteComponent, canActivate: [AuthGuard] },
  { path: 'empleado', component: EmpleadoComponent, canActivate: [AuthGuard] },
  { path: 'factura', component: FacturaComponent, canActivate: [AuthGuard] },
  { path: 'factura/detalle', component: DetalleComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
