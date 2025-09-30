import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../../core/models/producto.model';
import { ProductosService } from '../../core/services/productos.service';
import { Router, RouterModule } from '@angular/router';
import { SnackbarService } from '../../core/services/snackbar.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-productos-list',
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatFormFieldModule,  
    MatInputModule, 
    FormsModule
  ],
  templateUrl: './productos-list.component.html',
  styleUrl: './productos-list.component.scss',
})
export class ProductosListComponent implements OnInit {
  productos: Producto[] = [];
  displayedColumns = [
    'id',
    'nombre',
    'categoria',
    'precio',
    'stock',
    'acciones',
  ];

  total = 0;
  pageSize = 5;
  pageIndex = 0;

  filtroNombre: string = '';
  filtroCategoria: string = '';

  constructor(
    private productosService: ProductosService,
    private snackbar: SnackbarService,
    private router: Router
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.listar(this.pageIndex, this.pageSize).subscribe({
      next: (resp) => {
        this.productos = resp.items;
        this.total = resp.total;
      },
      error: () => {
        this.snackbar.error('No se pudieron cargar los productos');
      },
    });
  }

  get productosFiltrados(): Producto[] {
    return this.productos.filter(
      (p) =>
        (this.filtroNombre
          ? p.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
          : true) &&
        (this.filtroCategoria
          ? p.categoria
              .toLowerCase()
              .includes(this.filtroCategoria.toLowerCase())
          : true)
    );
  }

  cambiarPagina(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.cargarProductos();
  }

  nuevo() {
    this.router.navigate(['/productos/nuevo']);
  }

  editar(id: number) {
    this.router.navigate(['/productos/editar', id]);
  }

  verHistorial(id: number) {
    this.router.navigate(['/productos', id, 'historial']);
  }

  eliminar(id: number) {
    if (confirm('¿Seguro que deseas eliminar este producto?')) {
      this.productosService.eliminar(id).subscribe({
        next: () => {
          this.snackbar.success('Producto eliminado');
          this.cargarProductos();
        },
        error: () => {
          this.snackbar.error('Error al eliminar el producto');
        },
      });
    }
  }
}
