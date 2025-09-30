import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { Transaccion } from '../../core/models/transaccion.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { TransaccionesService } from '../../core/services/transacciones.service';
import { Router, RouterModule } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SnackbarService } from '../../core/services/snackbar.service';

@Component({
  selector: 'app-transacciones-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    RouterModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './transacciones-list.component.html',
  styleUrl: './transacciones-list.component.scss',
})
export class TransaccionesListComponent implements OnInit {
  transacciones: Transaccion[] = [];
  displayedColumns = [
    'id',
    'fecha',
    'tipo',
    'productoId',
    'cantidad',
    'precioUnitario',
    'precioTotal',
    'detalle',
  ];

  total = 0;
  pageSize = 5;
  pageIndex = 0;

  filtroTipo: string = '';
  filtroDetalle: string = '';

  constructor(
    private transaccionesService: TransaccionesService,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.cargarTransacciones();
  }

  cargarTransacciones() {
    this.transaccionesService.listar(this.pageIndex, this.pageSize).subscribe({
      next: (resp) => {
        this.transacciones = resp.items;
        this.total = resp.total;
      },
      error: () => {
        this.snackbar.error('Error cargando transacciones');
      },
    });
  }

  get transaccionesFiltrados(): Transaccion[] {
    return this.transacciones.filter(
      (p) =>
        (this.filtroTipo
          ? p.tipo.toLowerCase().includes(this.filtroTipo.toLowerCase())
          : true) &&
        (this.filtroDetalle
          ? p.detalle.toLowerCase().includes(this.filtroDetalle.toLowerCase())
          : true)
    );
  }

  cambiarPagina(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarTransacciones();
  }

  aplicarFiltros() {
    this.pageIndex = 0;
    this.cargarTransacciones();
  }

  nuevo() {
    this.router.navigate(['/transacciones/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/transacciones/editar', id]);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar esta transacción?')) {
      this.transaccionesService.eliminar(id).subscribe(() => {
        this.cargarTransacciones();
      });
    }
  }
}
