import { BusquedaProductosPorNombreService } from './../servicios/busqueda-productos-por-nombre.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';

import { fromEvent } from 'rxjs';
import { map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @ViewChild('inputProductoPorNombre') inputProductoPorNombre;

  productos: any[] = [];
  cargando: boolean = true;

  desde: number = 0;
  totalProductos: number = 0;

  constructor(
    private apiService: ApiService,
    private busquedaProductosPorNombreService: BusquedaProductosPorNombreService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.cargarBuscador();
  }

  cargarProductos() {
    this.apiService.peticionGet('productos?desde=' + this.desde)
      .subscribe((data: any) => {
        console.log(data);
        this.productos = data.productos;
        this.totalProductos = data.total;
        this.cargando = false;
      });
  }

  cargarBuscador() {
    this.busquedaProductosPorNombreService.obtenerProductos('productos-lista-completa');

    fromEvent(this.inputProductoPorNombre.nativeElement, 'keyup').pipe(debounceTime(400)
    , distinctUntilChanged()
    , map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
    , switchMap(title => this.busquedaProductosPorNombreService.obtenerProductosFiltrados(title)))
    .subscribe((productos: any) => {
      this.productos = productos;
      // console.log({categoriasFiltradas: this.categoriasFiltradas});
    });
  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalProductos ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarProductos();

  }

}
