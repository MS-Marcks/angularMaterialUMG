import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Empleado } from './../../models/empleado/empleado';
import { EmpleadoService } from './../../services/empleado/empleado.service';

@Component({
  selector: 'app-empleado',
  templateUrl: './empleado.component.html',
  styleUrls: ['./empleado.component.css']
})
export class EmpleadoComponent implements OnInit {
  dataSource: Empleado[];
  displayedColumns = ['id', 'nombre', 'codigo', 'salario', 'creado_por', 'editar', 'eliminar'];
  EmpleadoForm: FormGroup;

  estado = 0;
  eliminar = false;
  mensaje = 'CREAR';
  cancelar = false;
  mensajeEliminar;
  id = 0;
  meessage;
  constructor(private serviceEmpleado: EmpleadoService, private fb: FormBuilder) { }
  ngOnInit(): void {
    this.EmpleadoForm = this.fb.group({
      id: null,
      nombre: [null, Validators.required],
      codigo: [null, Validators.required],
      salario: [null, Validators.required],
      creado_por: [null, Validators.required]
    });

    this.Get();
  }
  Get(): void {
    this.dataSource = undefined;

    this.serviceEmpleado.getCliente().subscribe(
      (res) => {
        this.dataSource = res;
      }
    );
  }
  onSubmit(): void {
    this.meessage = 'CARGANDO...';
    if (this.estado === 0) {

      this.serviceEmpleado.postCliente(this.EmpleadoForm.value).subscribe(
        (res) => {
          this.meessage = res;
          this.Get();
          this.OnCancelar();
        }
      );

    } else if (this.estado === 1) {
      this.serviceEmpleado.updateCliente(this.EmpleadoForm.value).subscribe(
        (res) => {
          this.meessage = res;
          this.Get();
          this.OnCancelar();
        }
      );

    } else if (this.estado === 2) {
      this.serviceEmpleado.deleteCliente(this.id).subscribe(
        (res) => {
          this.meessage = res;
          this.Get();
          this.OnCancelar();
        }
      );
    }
  }
  Onobtener(element): void {
    this.EmpleadoForm.setValue(element);
    this.mensaje = 'EDITAR';
    this.estado = 1;
    this.cancelar = true;
    this.eliminar = false;
  }

  OnCancelar(): void {
    this.EmpleadoForm.reset();
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
    this.mensajeEliminar = `Deseas Eliminar En verdad al Empleado: ${element.nombre} Con ID ${element.id}`;
  }
  OnCargar(): boolean {
    if (typeof this.dataSource === 'undefined') {
      return false;
    } else {
      return true;
    }
  }
}
