import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Producto } from '../../core/models/producto.model';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { SnackbarService } from '../../core/services/snackbar.service';
import { TransaccionesService } from '../../core/services/transacciones.service';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { Transaccion } from '../../core/models/transaccion.model';

@Component({
  selector: 'app-transacciones-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    NgxMatSelectSearchModule,
  ],
  templateUrl: './transacciones-form.component.html',
  styleUrl: './transacciones-form.component.scss',
})
export class TransaccionesFormComponent implements OnInit {
  productos: Producto[] = [];
  stockActual = 0;
  form!: FormGroup;
  id: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private service: TransaccionesService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      id: [null],
      productoId: [null, Validators.required],
      tipo: ['compra', Validators.required],
      fecha: [new Date().toISOString(), Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]],
      precioUnitario: [0, [Validators.required, Validators.min(0)]],
      precioTotal: [{ value: 0, disabled: true }],
      detalle: [''],
    });

    this.productosService.listar(0, 999).subscribe((resp) => {
      this.productos = resp.items;
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.service.obtener(+this.id).subscribe((t) => {
        this.form.patchValue(t);
      });
    }
  }

  onProductoChange(id: number) {
    const prod = this.productos.find((x) => x.id === id);
    if (prod) {
      this.form.patchValue({ precioUnitario: prod.precio });
    }
    this.recalculaTotal();
  }

  recalculaTotal() {
    const c = this.form.get('cantidad')!.value || 0;
    const u = this.form.get('precioUnitario')!.value || 0;
    this.form.get('precioTotal')!.setValue(c * u, { emitEvent: false });
  }

  guardar() {
    if (this.form.invalid) return;
    const data = this.form.value as Transaccion;

    if (this.id) {
      this.service.actualizar(this.id, data).subscribe({
        next: () => {
          this.snackbar.success('Transacción actualizada correctamente');
          this.router.navigate(['/transacción']);
        },
        error: () => this.snackbar.error('Error al actualizar la transacción'),
      });
    } else {
      this.service.crear(data).subscribe({
        next: () => {
          this.router.navigate(['/transacciones']);
          this.snackbar.success('Transacción creada correctamente');
        },
        error: () => alert('Error al registrar la transacción'),
      });
    }
  }
}
