import { BusquedaProductosPorNombreService } from './../servicios/busqueda-productos-por-nombre.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../servicios/api.service';

import { fromEvent } from 'rxjs';
import { map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import swal from 'sweetalert';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  @ViewChild('inputProductoPorNombre') inputProductoPorNombre;
  @ViewChild('inputProductoPorModelo') inputProductoPorModelo;
  @ViewChild('inputProductoPorReferencia') inputProductoPorReferencia;
  
  @ViewChild('inputBusqueda') inputBusqueda;

  productosFiltrados: any[] = [];
  cargando: boolean = true;

  desde: number = 0;
  totalProductos: number = 0;

  tipoBusqueda: string = 'nombre'; // Nombre, Referencia, Modelo

  verMarca: boolean = true;
  verReferencia: boolean = true;
  verModelo: boolean = true;
  verCategoria: boolean = false;

  opciones: any[] = [
    'Marca', 
    'Referencia', 
    'Modelo'
  ];

  otrasOpciones: any[] = [
    'Categoría', 
    'EAN13', 
    'EAN14'
  ];

  constructor(
    private apiService: ApiService,
    private busquedaProductosPorNombreService: BusquedaProductosPorNombreService
  ) { }

  ngOnInit() {
    this.cargarProductos();
    this.cargarBuscador();
    this.verificarServicio();
  }

  verificarServicio() {
    this.cargando = this.busquedaProductosPorNombreService.cargando;

      let intervalo = setInterval(() => {
        if (this.cargando) {
          this.cargando = this.busquedaProductosPorNombreService.cargando;
          this.totalProductos = this.busquedaProductosPorNombreService.totalProductos;      
        } else {
          clearInterval(intervalo);
        }
      }, 1000)

  }

  cargarProductos() {
    // this.apiService.peticionGet('productos?desde=' + this.desde)
    //   .subscribe((data: any) => {
    //     console.log(data);
    //     this.productos = data.productos;
    //     this.totalProductos = data.total;
    //     this.cargando = false;
    //   });
  }

  cargarBuscador() {
    this.busquedaProductosPorNombreService.obtenerProductos('productos-lista-completa');





    // fromEvent(this.inputProductoPorNombre.nativeElement, 'keyup').pipe(debounceTime(400)
    // , distinctUntilChanged()
    // , map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
    // , switchMap(title => this.busquedaProductosPorNombreService.obtenerProductosFiltrados(title)))
    // .subscribe((productos: any) => {
    //   this.productos = productos;
    //   // console.log({categoriasFiltradas: this.categoriasFiltradas});
    // });

    // fromEvent(this.inputProductoPorModelo.nativeElement, 'keyup').pipe(debounceTime(400)
    // , distinctUntilChanged()
    // , map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
    // , switchMap(title => this.busquedaProductosPorNombreService.obtenerProductosFiltradosPorModelo(title)))
    // .subscribe((productos: any) => {
    //   this.productos = productos;
    //   // console.log({categoriasFiltradas: this.categoriasFiltradas});
    // });

    // fromEvent(this.inputProductoPorReferencia.nativeElement, 'keyup').pipe(debounceTime(400)
    // , distinctUntilChanged()
    // , map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
    // , switchMap(title => this.busquedaProductosPorNombreService.obtenerProductosFiltradosPorReferencia(title)))
    // .subscribe((productos: any) => {
    //   this.productos = productos;
    //   // console.log({categoriasFiltradas: this.categoriasFiltradas});
    // });

    fromEvent(this.inputBusqueda.nativeElement, 'keyup').pipe(debounceTime(400)
    , distinctUntilChanged()
    , map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
    , switchMap(title => this.busquedaProductosPorNombreService.obtenerProductosFiltrados2(title, this.tipoBusqueda)))
    .subscribe((productos: any) => {
      this.productosFiltrados = productos;
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

  ordenar() {
    swal(':(', 'Funcion no creada', 'warning');
  }

  quitarOpcion(opcion) {
    this.opciones = this.opciones.filter(element => element !== opcion);
    this.otrasOpciones.push(opcion);
  }

  agregarOpcion(opcion) {
    this.otrasOpciones = this.otrasOpciones.filter(element => element !== opcion);
    if (this.opciones.length === 3) {
      this.otrasOpciones.push(this.opciones[2]);
      this.opciones[2] = opcion;
    } else {
      this.opciones.push(opcion);
    }
  }

}
