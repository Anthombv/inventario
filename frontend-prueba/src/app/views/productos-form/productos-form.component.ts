import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductosService } from '../../core/services/productos.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { SnackbarService } from '../../core/services/snackbar.service';
import { Producto } from '../../core/models/producto.model';

@Component({
  selector: 'app-productos-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './productos-form.component.html',
  styleUrl: './productos-form.component.scss',
})
export class ProductosFormComponent {
  id: number | null = null;
  form: any;
  preview = '';

  constructor(
    private fb: FormBuilder,
    private productosService: ProductosService,
    private route: ActivatedRoute,
    private router: Router,
    private snackbar: SnackbarService
  ) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      categoria: ['', Validators.required],
      descripcion: [''],
      imagen: [''],
      precio: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
    });

    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.productosService.listar().subscribe((page) => {
        const producto = page.items.find((p) => p.id === this.id);
        if (producto) this.form.patchValue(producto);
      });
    }
  }

  guardar() {
    if (this.form.invalid) return;
    const data = this.form.value as Producto;

    if (this.id) {
      this.productosService.actualizar(this.id, data).subscribe({
        next: () => {
          this.snackbar.success('Producto actualizado correctamente');
          this.router.navigate(['/productos']);
        },
        error: () => this.snackbar.error('Error al actualizar el producto'),
      });
    } else {
      this.productosService.crear(data).subscribe({
        next: () => {
          this.snackbar.success('Producto creado correctamente');
          this.router.navigate(['/productos']);
        },
        error: () => this.snackbar.error('Error al crear el producto'),
      });
    }
  }
}
