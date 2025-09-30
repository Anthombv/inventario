import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Transaccion } from '../models/transaccion.model';
import { Page } from '../models/page.model';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TransaccionesService {
  private apiUrl = `${environment.apiTransacciones}/transacciones`;

  constructor(private http: HttpClient) {}

  listar(page = 0, pageSize = 10): Observable<Page<Transaccion>> {
    return this.http.get<Page<Transaccion>>(
      `${this.apiUrl}?page=${page}&pageSize=${pageSize}`
    );
  }

  obtener(id: number): Observable<Transaccion> {
    return this.http.get<Transaccion>(`${this.apiUrl}/${id}`);
  }

  crear(dto: Transaccion): Observable<Transaccion> {
    return this.http.post<Transaccion>(this.apiUrl, dto);
  }

  actualizar(id: number, dto: Transaccion): Observable<Transaccion> {
    return this.http.put<Transaccion>(`${this.apiUrl}/${id}`, dto);
  }

  eliminar(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
