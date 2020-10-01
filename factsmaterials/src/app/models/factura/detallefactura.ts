export class DetalleFactura {
  constructor(
    public id: number,
    public creado: string,
    public total: number,
    public empleado_id: number,
    public empleado: string,
    public cliente_id: number,
    public cliente: string,
    public estado: string

  ) { }
}
