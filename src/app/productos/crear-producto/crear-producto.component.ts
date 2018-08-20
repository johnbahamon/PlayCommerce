import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { BusquedaService } from '../../servicios/busqueda.service';

import { fromEvent } from 'rxjs';
import { map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { FuncionesService } from '../../servicios/funciones.service';
import { NgForm } from '@angular/forms';
import { UrlFirebaseService } from '../../servicios/url-firebase.service';

@Component({
  selector: 'app-crear-producto',
  templateUrl: './crear-producto.component.html',
  styleUrls: ['./crear-producto.component.css']
})
export class CrearProductoComponent implements OnInit {

  @ViewChild('inputCategoria') inputCategoria;

  productoId: string;

  caracteristicas: any[] = [
    ['Modelo', 'text'],
    ['Precio', 'number'],
    ['Existencias', 'number'],
    ['Color', 'text'],
    ['Referencia', 'text'],
    ['Garantía', 'text'],
    ['Código de Barras', 'number']
  ];

  caracteristicasSlug: string[] = [];

  pagina: number = 1;
  nombre: string;
  marca: any;
  categoria: any = {
    nombre: ''
  };
  categoriaParent: any;


  marcas: any[] = [];
  categorias: any[] = [];
  categoriasFiltradas: any[] = [];

  buscarCategoria: boolean = false;

  coleccion = [];

  pp: number = 1;

  constructor(
    private apiService: ApiService,
    private busquedaService: BusquedaService,
    private funcionesService: FuncionesService,
    public servicioURL: UrlFirebaseService
  ) { }

  ngOnInit() {
    this.cargarMarcas();
    this.convertirCaracteristicas();
  }

  elegir(event) {
    this.pp = event + 1;
  }

  convertirCaracteristicas() {
    this.caracteristicasSlug = this.caracteristicas.map(element => this.funcionesService.stringToSlug(element[0]));
    // console.log(this.caracteristicasSlug);
  }

  cambiarPagina( valor ) {
    this.pagina = valor;
  }

  cargarMarcas() {
    this.apiService.peticionGet('marcas-lista-completa')
      .subscribe((data: any) => {
        this.marcas = data.marcas;
        // console.log(this.marcas);
      });
  }

  cargarCategorias() {
    this.apiService.peticionGet('categorias-lista-completa-populada')
      .subscribe((data: any) => {
        this.categorias = data.categorias;
      });

      this.busquedaService.obtenerCategorias('categorias-lista-completa-populada');

      fromEvent(this.inputCategoria.nativeElement, 'keyup').pipe(debounceTime(400)
      , distinctUntilChanged()
      , map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
      , switchMap(title => this.busquedaService.obtenerCategoriasFiltradasAdecuadas(title)))
      .subscribe((categories: any) => {
        this.categoriasFiltradas = categories;
        console.log(this.categoriasFiltradas);
      });

  }

  elegirCategoria(categoria) {
    this.categoria = categoria;
    this.buscarCategoria = false;
    this.categoriaParent = this.categorias.find( element => element._id === this.categoria.parent._id);
  }

  buscarCategorias() {
    this.buscarCategoria = true;
    this.cargarCategorias();
  }

  crearProducto(form: NgForm) {

    const formValues = Object.assign({}, form.value);
    const producto = {
      nombre: this.nombre,
      slug: this.funcionesService.stringToSlug(this.nombre),
      marca: this.marca,
      categoria: this.categoria._id,
      categoria_padre: this.categoriaParent._id,
      caracteristicas: {},
      detalles: {},
      pp: this.pp,
      pictures: this.servicioURL.obtenerUrls()
    };
    // Features
    this.caracteristicasSlug.forEach(element => {
      producto.caracteristicas[element] = formValues[element];
    });

    // specifics
    this.categoriaParent.detalles.forEach(element => {
      if (element[3]) {
        const elementA = element[1] + '_A';
        const elementB = element[1] + '_B';
        producto.detalles[element[1]] = formValues[elementA] + ' ' + formValues[elementB];
      } else {
        producto.detalles[element[1]] = formValues[element[1]];
      }
    });


    // console.log('formValues');
    // console.log(formValues);
    // console.log('formValues');
    console.log('producto');
    console.log(producto);
    console.log('producto');
    this.apiService.peticionesPost('productos', producto)
      .subscribe((data: any) => {
        this.productoId = data.producto._id;
        swal(`Muy bien`, `Producto con Id ${this.productoId} creado`, 'success');
      });
  }

  imprimirCategoria() {
    console.log(this.categoriaParent.detalles);
  }

  loadImages(event) {
    this.coleccion = event.target.files;
    console.log(this.coleccion);
  }

  agregarImagenes() {
    const body = {
      pp: this.pp,
      pictures: this.servicioURL.obtenerUrls()
    };
  }

  crearArrayImagenes() {
    const picturesLarge = this.servicioURL.urlFirebase;
    const pictures = {
      pp: this.pp,
      large: picturesLarge,
      medium: [],
      small: []
    };

    for (const picture of picturesLarge) {
      const url2 = picture.split('?')[0];
      const urlThumbnail = url2.split('%2F')[0] + '%2Fthumb%40100_' + url2.split('%2F')[1];
      const urlThumbnail2 = url2.split('%2F')[0] + '%2Fthumb%40300_' + url2.split('%2F')[1];


      pictures.small.push(urlThumbnail + '?alt=media');
      pictures.medium.push(urlThumbnail2 + '?alt=media');
    }

    console.log(pictures);

    this.apiService.peticionesPut(`productos/${this.productoId}`, pictures )
      .subscribe((data: any) => {
        swal('Bien', 'Actualizada', 'success');
        this.servicioURL.resetear();
        this.coleccion = [];
      });
  }

}
