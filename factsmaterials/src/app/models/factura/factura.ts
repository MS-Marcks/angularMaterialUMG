export class Factura {
  constructor(
    public id: number,
    public cliente_id: Date,
    public empleado_id: number,
    public estado: string,
    public creado: Date,
  ) { }
}
