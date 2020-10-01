export class DetalleFacturaProducto{
  constructor(
    public id: number,
    public nombre: string,
    public cantidad: number,
    public subtotal: number,
    public creado_por: string
  ){}
}
