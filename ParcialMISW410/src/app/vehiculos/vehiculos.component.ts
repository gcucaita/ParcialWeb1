import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Vehiculo } from './vehiculo';
import { VehiculoService } from './vehiculo.service';

@Component({
  selector: 'app-vehiculos',
  templateUrl: './vehiculos.component.html',
  styleUrls: ['./vehiculos.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class VehiculosComponent implements OnInit {

  vehiculos: Vehiculo[] = [];
  resumenMarcas: { marca: string; total: number }[] = [];

  constructor(private vehiculoService: VehiculoService) { }

  ngOnInit() {
    this.cargarVehiculos();
  }

  private cargarVehiculos(): void {
    this.vehiculoService.obtenerVehiculos().subscribe((data) => {
      this.vehiculos = data;
      this.calcularResumenMarcas();
    });
  }

  private calcularResumenMarcas(): void {
    const conteo = new Map<string, number>();
    this.vehiculos.forEach((vehiculo) => {
      const totalActual = conteo.get(vehiculo.marca) ?? 0;
      conteo.set(vehiculo.marca, totalActual + 1);
    });

    this.resumenMarcas = Array.from(conteo.entries()).map(([marca, total]) => ({
      marca,
      total
    }));
  }
}
