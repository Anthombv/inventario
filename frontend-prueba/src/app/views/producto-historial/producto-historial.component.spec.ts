import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoHistorialComponent } from './producto-historial.component';

describe('ProductoHistorialComponent', () => {
  let component: ProductoHistorialComponent;
  let fixture: ComponentFixture<ProductoHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductoHistorialComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProductoHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
