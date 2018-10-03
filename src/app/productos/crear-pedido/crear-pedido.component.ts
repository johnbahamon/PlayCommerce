import { ApiService } from './../../servicios/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { BusquedaProductosService } from '../../servicios/busqueda-productos.service';

import { fromEvent } from 'rxjs';
import { map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-crear-pedido',
  templateUrl: './crear-pedido.component.html',
  styleUrls: ['./crear-pedido.component.css']
})
export class CrearPedidoComponent implements OnInit {

  @ViewChild('inputProducto') inputProducto;

  productosFiltrados: any[] = [];
  producto: any;
  mostrarBuscador: boolean = true;

  constructor(
    private busquedaProductosService: BusquedaProductosService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.comenzarBuscador();
  }

  comenzarBuscador() {
    this.busquedaProductosService.obtenerProductos('productos-lista-completa');

    fromEvent(this.inputProducto.nativeElement, 'keyup').pipe(debounceTime(400)
      , distinctUntilChanged()
      , map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
      , switchMap(title => this.busquedaProductosService.obtenerProductosFiltrados(title)))
      .subscribe((productos: any) => {
        this.productosFiltrados = productos;
        console.log(this.productosFiltrados);
      });
  }

  elegirProducto(producto) {

    this.apiService.peticionGet(`productos/${producto._id}`)
      .subscribe((data: any) => {
        this.producto = data.producto;
        console.log(this.producto);
        this.mostrarBuscador = false;
      });

    this.productosFiltrados = [];
    this.inputProducto.nativeElement.value = '';

  }

}
