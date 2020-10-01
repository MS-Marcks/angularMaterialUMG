import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Cliente } from './../../models/cliente/cliente';
import { ClienteService } from './../../services/cliente/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

  dataSource: Cliente[];
  displayedColumns = ['id', 'nombre', 'direccion', 'nit', 'creado_por', 'editar', 'eliminar'];
  ClientForm: FormGroup;

  estado = 0;
  eliminar = false;
  mensaje = 'CREAR';
  cancelar = false;
  mensajeEliminar;
  id = 0;
  meessage;

  constructor(private serviceCliente: ClienteService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.ClientForm = this.fb.group({
      id: null,
      nombre: [null, Validators.required],
      direccion: [null, Validators.required],
      nit: [null, Validators.required],
      creado_por: [null, Validators.required]
    });
    this.Get();
  }
  Get(): void {
    this.dataSource = undefined;
    this.serviceCliente.getCliente().subscribe(
      (res) => {
        this.dataSource = res;
      }
    );
  }
  onSubmit(): void {
    this.meessage = 'CARGANDO...';

    if (this.estado === 0) {
      this.serviceCliente.postCliente(this.ClientForm.value).subscribe(
        (res) => {
          this.meessage = res;
          this.Get();
          this.OnCancelar();
        }
      );
    } else if (this.estado === 1) {
      this.serviceCliente.updateCliente(this.ClientForm.value).subscribe(
        (res) => {
          this.meessage = res;
          this.Get();
          this.OnCancelar();
        }
      );
    } else if (this.estado === 2) {
      this.serviceCliente.deleteCliente(this.id).subscribe(
        (res) => {
          this.meessage = res;
          this.Get();
          this.OnCancelar();
        }
      );
    }
  }
  Onobtener(element): void {
    this.ClientForm.setValue(element);
    this.mensaje = 'EDITAR';
    this.estado = 1;
    this.cancelar = true;
    this.eliminar = false;
  }
  OnCancelar(): void {
    this.ClientForm.reset();
    this.mensaje = 'CREAR';
    this.estado = 0;
    this.cancelar = false;
    this.eliminar = false;
  }
  OnEliminar(element): void {
    this.id = element.id;
    this.mensaje = 'ELIMINAR';
    this.estado = 2;
    this.cancelar = true;
    this.eliminar = true;
    this.mensajeEliminar = `Deseas Eliminar En verdad al Cliente: ${element.nombre} Con ID ${element.id}`;
  }
  OnCargar(): boolean {

    if (typeof this.dataSource === 'undefined') {
      return false;
    } else {
      return true;
    }
  }
}
