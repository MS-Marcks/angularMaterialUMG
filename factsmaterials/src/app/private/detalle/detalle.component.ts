import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DetalleFacturaProducto } from './../../models/factura/detallefacturaProducto';
import { FacturaService } from 'src/app/services/factura/factura.service';
import { EmpleadoService } from 'src/app/services/empleado/empleado.service';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { Router } from '@angular/router';
import { Producto } from './../../models/producto/product';
import { Factura } from 'src/app/models/factura/factura';
import { ProductoService } from './../../services/producto/producto.service';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {

  dataSource: DetalleFacturaProducto[];
  displayedColumns = ['id', 'nombre', 'cantidad', 'subtotal', 'creado_por', 'eliminar'];
  factura: Factura;
  DetallleForm: FormGroup;
  producto: Producto = {
    id: undefined,
    nombre: undefined,
    precio: undefined,
    creado_por: undefined
  };
  estado = 0;
  eliminar = false;
  mensaje = 'CREAR';
  cancelar = false;
  mensajeEliminar;
  id = 0;
  meessage;
  // tslint:disable-next-line: max-line-length
  constructor(private fb: FormBuilder, private serviceFactura: FacturaService, private serviceCliente: ClienteService, private serviceEmpleado: EmpleadoService, private routes: Router, private serviceProducto: ProductoService) { }
  ngOnInit(): void {
    this.factura = JSON.parse(localStorage.getItem('factura'));
    this.DetallleForm = this.fb.group({
      id: null,
      producto_id: [null, Validators.required],
      cantidad: [null, Validators.required],
      creado_por: [null, Validators.required]
    });
    this.Get();
  }
  Get(): void {
    this.dataSource = undefined;
    this.serviceFactura.getFacturaDetalle(this.factura.id).subscribe(
      (res) => {
        this.dataSource = res;
      }
    );
  }
  onSubmit(): void {
    this.meessage = 'CARGANDO...';
    if (this.estado === 0) {
      if (this.factura.estado !== 'CANCELADO' && this.factura.estado !== 'ANULADA') {
        if (typeof this.producto.id !== 'undefined') {
          const compra = {
            producto_id: this.producto.id,
            cantidad: this.DetallleForm.value.cantidad,
            subtotal: (this.producto.precio * parseInt(this.DetallleForm.value.cantidad, 10)),
            creado_por: this.DetallleForm.value.creado_por
          };
          this.serviceFactura.postFacturaDetalle(compra, this.factura.id).subscribe(
            (res) => {
              this.meessage = res;
              this.Get();
              this.OnCancelar();
            }
          );
        } else {
          this.meessage = 'NO SELECCIONADO EL PRODUCTO';
        }
      } else {
        this.meessage = 'LA FACTURA A SIDO BLOQUEADA';
      }

    } else if (this.estado === 2) {
      if (this.factura.estado !== 'CANCELADO' && this.factura.estado !== 'ANULADA') {
        this.serviceFactura.deleteFacturaDetalle(this.id).subscribe(
          (res) => {
            this.meessage = res;
            this.Get();
            this.OnCancelar();
          }
        );
      } else {
        this.meessage = 'LA FACTURA A SIDO BLOQUEADA';
      }
    }
  }

  OnCancelar(): void {
    this.producto = {
      id: undefined,
      nombre: undefined,
      precio: undefined,
      creado_por: undefined
    };
    this.DetallleForm.reset();
    this.mensaje = 'CREAR';
    this.estado = 0;
    this.cancelar = false;
    this.eliminar = false;
    this.mensajeEliminar = '';
  }
  OnEliminar(element): void {
    this.id = element.id;
    this.mensaje = 'ELIMINAR';
    this.estado = 2;
    this.cancelar = true;
    this.eliminar = true;
    this.mensajeEliminar = `Deseas Eliminar esta Este producto Con ID ${element.id}`;
  }
  OnBuscarProducto(): void {
    this.meessage = 'CARGANDO...';
    this.serviceProducto.getproducto(this.DetallleForm.value.producto_id).subscribe(
      (res) => {
        this.meessage = '';
        this.producto = res;
      }
    );
  }
  OnTerminar(): void {
    if (this.factura.estado !== 'CANCELADO' && this.factura.estado !== 'ANULADA') {
      this.serviceFactura.PatchFactura({ id: this.factura.id, estado: 'CANCELADO' }).subscribe(
        (res) => {
          this.producto = res;
          this.routes.navigate(['factura']);
        }
      );
    } else {
      this.meessage = 'LA FACTURA A SIDO BLOQUEADA';
    }
  }
  OnCargar(): boolean {
    if (typeof this.dataSource === 'undefined') {
      return false;
    } else {
      return true;
    }
  }
}
