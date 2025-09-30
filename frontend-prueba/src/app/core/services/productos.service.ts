import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../models/producto.model';
import { Page } from '../models/page.model';
import { environment } from '../../../environments/environment';
import { Transaccion } from '../models/transaccion.model';

@Injectable({ providedIn: 'root' })
export class ProductosService {
  private apiUrl = `${environment.apiProductos}/productos`;

  constructor(private http: HttpClient) {}

  listar(page = 0, pageSize = 10): Observable<Page<Producto>> {
    return this.http.get<Page<Producto>>(
      `${this.apiUrl}?page=${page}&pageSize=${pageSize}`
    );
  }

  getById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.apiUrl}/${id}`);
  }

  crear(dto: Producto): Observable<Producto> {
    return this.http.post<Producto>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: Producto): Observable<Producto> {
    return this.http.put<Producto>(`${this.apiUrl}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getHistorial(
    id: number,
    fechaInicio?: string,
    fechaFin?: string,
    tipo?: string
  ): Observable<Transaccion[]> {
    let params: string[] = [];
    if (fechaInicio) params.push(`fechaInicio=${fechaInicio}`);
    if (fechaFin) params.push(`fechaFin=${fechaFin}`);
    if (tipo) params.push(`tipo=${tipo}`);
    const query = params.length > 0 ? '?' + params.join('&') : '';
    return this.http.get<Transaccion[]>(
      `${this.apiUrl}/${id}/historial${query}`
    );
  }
}
