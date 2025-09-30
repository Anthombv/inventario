export interface Transaccion {
  id: number;
  fecha: Date;
  tipo: 'compra' | 'venta';
  productoId: number;
  cantidad: number;
  precioUnitario: number;
  precioTotal: number;
  detalle: string;
}
