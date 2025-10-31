import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { VehiculoService } from './vehiculo.service';
import { environment } from '../../environments/environment.development';
import { Vehiculo } from './vehiculo';

describe('VehiculoService', () => {
  let service: VehiculoService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [VehiculoService, provideZonelessChangeDetection()]
    });
    service = TestBed.inject(VehiculoService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should fetch vehiculos from API', () => {
    const mockVehiculos: Vehiculo[] = [
      { id: 1, marca: 'Renault', linea: 'Kangoo', referencia: 'VU Express', modelo: '2017', kilometraje: 1000, color: 'Blanco', imagen: '' },
      { id: 2, marca: 'Chevrolet', linea: 'Spark', referencia: 'Life', modelo: '2018', kilometraje: 2000, color: 'Rojo', imagen: '' }
    ];

    service.obtenerVehiculos().subscribe((vehiculos) => {
      expect(vehiculos).toEqual(mockVehiculos);
    });

    const request = httpMock.expectOne(environment.baseUrl);
    expect(request.request.method).toBe('GET');
    request.flush(mockVehiculos);
  });
});
