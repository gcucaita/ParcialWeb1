import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { VehiculosComponent } from './vehiculos.component';
import { VehiculoService } from './vehiculo.service';
import { Vehiculo } from './vehiculo';

class MockVehiculoService {
  private vehiculosMock: Vehiculo[] = [
    { id: 1, marca: 'Ford', linea: 'Escape', referencia: 'FD Escape', modelo: '2017', kilometraje: 1000, color: 'Blanco', imagen: '' },
    { id: 2, marca: 'Chevrolet', linea: 'Spark', referencia: 'Life', modelo: '2018', kilometraje: 2000, color: 'Plata', imagen: '' },
    { id: 3, marca: 'Chevrolet', linea: 'Sail', referencia: 'LT', modelo: '2016', kilometraje: 3000, color: 'Rojo', imagen: '' }
  ];

  obtenerVehiculos() {
    return of(this.vehiculosMock);
  }
}

describe('VehiculosComponent', () => {
  let component: VehiculosComponent;
  let fixture: ComponentFixture<VehiculosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiculosComponent],
      providers: [
        { provide: VehiculoService, useClass: MockVehiculoService },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(VehiculosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render table with header and three rows for the vehiculos list', () => {
    const compiled: HTMLElement = fixture.nativeElement;
    const tables = compiled.querySelectorAll('table');
    expect(tables.length).toBeGreaterThan(0);

    const vehiculosTable = tables[0];
    const headerRows = vehiculosTable.querySelectorAll('thead tr');
    const bodyRows = vehiculosTable.querySelectorAll('tbody tr');

    expect(headerRows.length).toBe(1);
    expect(bodyRows.length).toBe(3);
  });
});
