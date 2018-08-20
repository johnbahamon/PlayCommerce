import { FuncionesService } from './../../servicios/funciones.service';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productoId: string;
  producto: any;
  cargando: boolean = true;
  caracteristicas: string[] = [];
  detalles: string[] = [];

  caracteristicasCap: any[] = [
    ['Modelo', 'modelo'],
    ['Precio', 'precio'],
    ['Existencias', 'existencias'],
    ['Color', 'color'],
    ['Referencia', 'referencia'],
    ['Garantía', 'garantia'],
    ['Código de Barras', 'codigo_de_barras']
  ];

  detallesCap: string[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private funcionesService: FuncionesService
  ) { }

  ngOnInit() {
    this.encontrarId();
  }

  cargarProducto() {
    this.apiService.peticionGet('productos/' + this.productoId)
      .subscribe((data: any) => {
        this.producto = data.producto;
        this.cargando = false;
        this.caracteristicas = Object.keys(this.producto.caracteristicas);
        this.detalles = Object.keys(this.producto.detalles);
        this.detallesCap = this.producto.categoria_padre.detalles.map(element => element[0]);
        console.log(this.producto);
        console.log(this.detallesCap);
      });
  }

  encontrarId() {
    this.productoId = this.route.snapshot.params.id;
    this.cargarProducto();
  }

}
