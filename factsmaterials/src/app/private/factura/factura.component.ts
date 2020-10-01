import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DetalleFactura } from './../../models/factura/detallefactura';
import { FacturaService } from './../../services/factura/factura.service';
import { ClienteService } from './../../services/cliente/cliente.service';
import { EmpleadoService } from './../../services/empleado/empleado.service';
import { Empleado } from './../../models/empleado/empleado';
import { Cliente } from 'src/app/models/cliente/cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.css']
})
export class FacturaComponent implements OnInit {

  dataSource: DetalleFactura[];
  displayedColumns = ['id', 'creado', 'empleado', 'cliente', 'total', 'estado', 'detalle', 'editar', 'eliminar'];

  FacturaGroup: FormGroup;
  cliente: Cliente = {
    id: undefined,
    nombre: undefined,
    direccion: undefined,
    nit: undefined,
    creado_por: undefined
  };
  empleado: Empleado = {
    id: undefined,
    nombre: undefined,
    salario: undefined,
    creado_por: undefined,
    codigo: undefined
  };
  estado = 0;
  eliminar = false;
  mensaje = 'CREAR';
  cancelar = false;
  mensajeEliminar;
  id = 0;
  meessage;
  constructor(private fb: FormBuilder, private serviceFactura: FacturaService, private serviceCliente: ClienteService, private serviceEmpleado: EmpleadoService, private routes: Router) { }
  ngOnInit(): void {
    this.FacturaGroup = this.fb.group({
      id: null,
      cliente_id: [null, Validators.required],
      empleado_id: [null, Validators.required],
      estado: null
    });
    this.Get();
  }
  Get(): void {
    this.dataSource = undefined;
    this.serviceFactura.getFacturas().subscribe(
      (res) => {
        this.dataSource = res;
      }
    );
  }
  onSubmit(): void {
    this.meessage = 'CARGANDO...';
    if (this.estado === 0) {
      if (typeof this.cliente.id !== 'undefined' && typeof this.empleado.id !== 'undefined') {
        this.serviceFactura.postFactura(this.FacturaGroup.value).subscribe(
          (res) => {
            this.meessage = res;

            this.Get();
            this.OnCancelar();
          }
        );
      }else{
        this.meessage = 'NO EXISTE CLIENTE Y/O USUARIO O NO LO HAS SELECCIONADO';
      }
    } else if (this.estado === 1) {
      if (typeof this.cliente.id !== 'undefined' && typeof this.empleado.id !== 'undefined' && this.FacturaGroup.value.estado !== 'ANULADA') {
        this.serviceFactura.updateFactura(this.FacturaGroup.value).subscribe(
          (res) => {
            this.meessage = res;

            this.Get();
            this.OnCancelar();
          }
        );

      }else{
        this.meessage = 'NO EXISTE CLIENTE Y/O USUARIO O NO LO HAS SELECCIONADO';
      }
    } else if (this.estado === 2) {
      this.serviceFactura.deleteFactura(this.id).subscribe(
        (res) => {
          this.meessage = res;
          this.Get();
          this.OnCancelar();
        }
      );
    }
  }
  Onobtener(element): void {
    this.FacturaGroup.setValue({ cliente_id: element.cliente_id, id: element.id, empleado_id: element.empleado_id, estado: element.estado });
    this.mensaje = 'EDITAR';
    this.estado = 1;
    this.cancelar = true;
    this.eliminar = false;
  }

  OnCancelar(): void {
    this.FacturaGroup.reset();
    this.mensaje = 'CREAR';
    this.estado = 0;
    this.cancelar = false;
    this.eliminar = false;
    this.mensajeEliminar = '';
    this.cliente = {
      id: undefined,
      nombre: undefined,
      direccion: undefined,
      nit: undefined,
      creado_por: undefined
    };
    this.empleado = {
      id: undefined,
      nombre: undefined,
      salario: undefined,
      creado_por: undefined,
      codigo: undefined
    };
  }
  OnEliminar(element): void {
    this.id = element.id;
    this.mensaje = 'ELIMINAR';
    this.estado = 2;
    this.cancelar = true;
    this.eliminar = true;
    this.mensajeEliminar = `Deseas Eliminar esta factura Con ID ${element.id}`;
  }
  Ondetalle(element): void {
    localStorage.setItem('factura', JSON.stringify(element));
    if (element.estado === 'PROCESO' || element.estado === 'ANULADA'|| element.estado ===  'CANCELADO') {
      this.routes.navigate(['factura/detalle']);
    } else {
      this.serviceFactura.PatchFactura({ id: element.id, estado: 'PROCESO' }).subscribe(
        (res) => {
          console.log(res);
          this.routes.navigate(['factura/detalle']);
        }
      );
    }

  }
  OnBuscarCliente(): void {
    this.meessage = 'CARGANDO...';
    this.serviceCliente.getClienteSingle(this.FacturaGroup.value.cliente_id).subscribe(
      (res) => {
        this.meessage = '';
        this.cliente = res;
      }
    );
  }

  OnBuscarEmpleados(): void {
    this.meessage = 'CARGANDO...';
    this.serviceEmpleado.getEmpleadoSingle(this.FacturaGroup.value.empleado_id).subscribe(
      (res) => {
        this.meessage = '';
        this.empleado = res;
      }
    );
  }
  OnCargar(): boolean {
    if (typeof this.dataSource === 'undefined') {
      return false;
    } else {
      return true;
    }
  }
}
