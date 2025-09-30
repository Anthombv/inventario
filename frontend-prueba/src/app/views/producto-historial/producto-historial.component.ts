import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Producto } from '../../core/models/producto.model';
import { Transaccion } from '../../core/models/transaccion.model';
import { ProductosService } from '../../core/services/productos.service';
import { TransaccionesService } from '../../core/services/transacciones.service';

@Component({
  selector: 'app-producto-historial',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatTableModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './producto-historial.component.html',
  styleUrl: './producto-historial.component.scss',
})
export class ProductoHistorialComponent implements OnInit {
  producto!: Producto;
  transacciones: Transaccion[] = [];
  displayedColumns = [
    'id',
    'fecha',
    'tipo',
    'cantidad',
    'precioUnitario',
    'precioTotal',
    'detalle',
  ];

  form!: FormGroup

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private transaccionesService: TransaccionesService,
    private productosService: ProductosService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      fechaInicio: [null],
      fechaFin: [null],
      tipo: [''],
    });

    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.productosService
      .getById(id)
      .subscribe((prod) => (this.producto = prod));
    this.cargarHistorial();
  }

  cargarHistorial() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    const f = this.form.value;
    const fechaInicio = f.fechaInicio
      ? new Date(f.fechaInicio).toISOString()
      : undefined;
    const fechaFin = f.fechaFin
      ? new Date(f.fechaFin).toISOString()
      : undefined;
    this.productosService
      .getHistorial(id, fechaInicio, fechaFin, f.tipo!)
      .subscribe({
        next: (resp) => (this.transacciones = resp),
        error: () => (this.transacciones = []),
      });
  }
}
