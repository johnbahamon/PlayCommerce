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

  etiqueta: string;

  productos: any[] = [];
  productosFiltrados: any[] = [];

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

  elegirCategoria(event) {
    const CATEGORIA = this.categorias.find(element => element._id === event);
    this.subcategorias = CATEGORIA.children;
    this.subcategoriaElegidaId = undefined;
    this.subcategoria2ElegidaId = undefined;
    this.subcategorias2 = [];
  }

  elegirSubcategoria(event) {
    const CATEGORIA = this.subcategorias.find(element => element._id === event);
    this.subcategoria2ElegidaId = undefined;
    this.subcategorias2 = CATEGORIA.children;
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

}
