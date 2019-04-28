import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

import swal from 'sweetalert';

import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-por-marca-categoria',
  templateUrl: './por-marca-categoria.component.html',
  styleUrls: ['./por-marca-categoria.component.css']
})
export class PorMarcaCategoriaComponent implements OnInit {

  @ViewChild('nombreProducto') nombreProducto;

  marcas: any[] = [];
  marcaElegidaId: string;

  categorias: any[] = [];
  categoriaElegidaId: string;

  subcategorias: any[] = [];
  subcategoriaElegidaId: string;

  subcategorias2: any[] = [];
  subcategoria2ElegidaId: string;

  etiqueta: string = 'Producto';

  productos: any[] = [];
  productosFiltrados: any[] = [];




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
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.cargarMarcas();
    this.cargarCategorias();
  }

  cargarMarcas() {
    this.apiService.peticionGet('nombre-marcas-lista-completa')
      .subscribe(
        (data: any) => {
          this.marcas = data.marcas;
          // console.log(this.marcas);
        }
      )
  }

  cargarCategorias() {
    this.apiService.peticionGet('crear-arbol-sin-rya')
      .subscribe(
        (data: any) => {
          this.categorias = data.categorias;
          // console.log(this.marcas);
        }
      )
  }

  elegirCategoria(categoria) {
    this.productos = [];
    this.productosFiltrados = [];
    const CATEGORIA = this.categorias.find(element => element._id === categoria);
    this.subcategorias = CATEGORIA.children;
    this.subcategoriaElegidaId = undefined;
    this.subcategoria2ElegidaId = undefined;
    this.subcategorias2 = [];



    this.apiService.peticionGet(`productos-por-categoria-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=${this.etiqueta}&categoria=${categoria}`)
        .subscribe((data: any) => {
          this.productos = data.productos;
          this.productosFiltrados = this.productos;
          this.cargarBuscador();
        })

  }

  elegirSubcategoria(subcategoria) {
    this.productos = [];
    this.productosFiltrados = [];
    const CATEGORIA = this.subcategorias.find(element => element._id === subcategoria);
    this.subcategoria2ElegidaId = undefined;
    this.subcategorias2 = CATEGORIA.children;

    this.apiService.peticionGet(`productos-por-categoria-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=${this.etiqueta}&categoria=${this.categoriaElegidaId}&categoria2=${subcategoria}`)
        .subscribe((data: any) => {
          this.productos = data.productos;
          this.productosFiltrados = this.productos;
          this.cargarBuscador();
        })
  }

  elegirSubcategoria2(subcategoria2) {
    this.productos = [];
    this.productosFiltrados = [];
    // const CATEGORIA = this.subcategorias.find(element => element._id === subcategoria);
    // this.subcategoria2ElegidaId = undefined;
    // this.subcategorias2 = CATEGORIA.children;

    this.apiService.peticionGet(`productos-por-categoria-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=${this.etiqueta}&categoria=${this.categoriaElegidaId}&categoria2=${this.subcategoriaElegidaId}&categoria3=${subcategoria2}`)
        .subscribe((data: any) => {
          this.productos = data.productos;
          this.productosFiltrados = this.productos;
          this.cargarBuscador();
        })
  }

  buscar() {
    console.log(
      {
        marca: this.marcaElegidaId,
        categoria: this.categoriaElegidaId,
        subcategoria: this.subcategoriaElegidaId,
        subcategoria2: this.subcategoria2ElegidaId,
        etiqueta: this.etiqueta
      }
    );
    
    if (!this.etiqueta || !this.subcategoriaElegidaId || !this.marcaElegidaId) {
      swal(`:|`, `Hay campos obligatorios`, 'warning');
    } else {
      const CATEGORIABUSCAR = this.subcategoria2ElegidaId || this.subcategoriaElegidaId;
      this.apiService.peticionGet(`productos-por-categoria-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=${this.etiqueta}&categoria=${CATEGORIABUSCAR}`)
        .subscribe((data: any) => {
          this.productos = data.productos;
          this.productosFiltrados = this.productos;
          this.cargarBuscador();
        })
    }
  }

  cargarBuscador() {

    fromEvent(this.nombreProducto.nativeElement, 'keyup').pipe(debounceTime(400)
    , distinctUntilChanged()
    , map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
    , switchMap(title => this.obtenerProductosFiltrados(title)))
    .subscribe((productos: any) => {
      this.productosFiltrados = productos;
    });
  }

  obtenerProductosFiltrados(name: string): Observable<any[]> {
    if (name === '') {
      // return of([]);
      return of(this.productos);
    } else {
      return of(this.filtrarProductos(name));
    }
  }

  filtrarProductos(name) {
    console.log('FUNCION NORMAL # 2');
    return name ? this.productos.filter((producto) => new RegExp(name, 'gi').test(producto.nombre)) : [];
    // return name ? this.listaProductos.filter((producto) => new RegExp(name, 'gi').test(producto.caracteristicas.referencia)) : [];
  }

  elegirMarca(marca) {
    this.productos = [];
    this.productosFiltrados = [];

    this.categoriaElegidaId = undefined;
    this.subcategoriaElegidaId = undefined;
    this.subcategoria2ElegidaId = undefined;
    // this.categorias = [];
    this.subcategorias = [];
    this.subcategorias2 = [];

    this.apiService.peticionGet(`productos-por-marca-y-etiqueta?marca=${marca}&etiqueta=${this.etiqueta}`)
        .subscribe((data: any) => {
          this.productos = data.productos;
          this.productosFiltrados = this.productos;
        })
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
