import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { of } from 'rxjs';
import { App } from './app';
import { VehiculosComponent } from './vehiculos/vehiculos.component';
import { VehiculoService } from './vehiculos/vehiculo.service';
import { Vehiculo } from './vehiculos/vehiculo';

class MockVehiculoService {
  private vehiculosMock: Vehiculo[] = [
    { id: 1, marca: 'Renault', linea: 'Kangoo', referencia: 'VU Express', modelo: '2017', kilometraje: 1000, color: 'Blanco', imagen: '' },
    { id: 2, marca: 'Chevrolet', linea: 'Spark', referencia: 'Life', modelo: '2018', kilometraje: 2000, color: 'Plata', imagen: '' },
    { id: 3, marca: 'Chevrolet', linea: 'Sail', referencia: 'LT', modelo: '2016', kilometraje: 3000, color: 'Rojo', imagen: '' }
  ];

  obtenerVehiculos() {
    return of(this.vehiculosMock);
  }
}

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        VehiculosComponent
      ],
      declarations: [
        App
      ],
      providers: [
        { provide: VehiculoService, useClass: MockVehiculoService },
        provideZonelessChangeDetection()
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('TuSegundazo.com');
  });
});
