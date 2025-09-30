import { Routes } from '@angular/router';
import { ProductosListComponent } from './views/productos-list/productos-list.component';
import { ProductosFormComponent } from './views/productos-form/productos-form.component';
import { TransaccionesListComponent } from './views/transacciones-list/transacciones-list.component';
import { TransaccionesFormComponent } from './views/transacciones-form/transacciones-form.component';
import { ProductoHistorialComponent } from './views/producto-historial/producto-historial.component';

export const routes: Routes = [
  { path: 'productos', component: ProductosListComponent },
  { path: 'productos/nuevo', component: ProductosFormComponent },
  { path: 'productos/editar/:id', component: ProductosFormComponent },
  { path: 'productos/:id/historial', component: ProductoHistorialComponent },
  { path: 'transacciones', component: TransaccionesListComponent },
  { path: 'transacciones/nuevo', component: TransaccionesFormComponent },
  { path: 'transacciones/editar/:id', component: TransaccionesFormComponent },
  { path: '', redirectTo: 'productos', pathMatch: 'full' },
  { path: '**', redirectTo: 'productos' },
];
