import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';

import swal from 'sweetalert';

import { fromEvent, Observable, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CategoriaFormComponent } from './categoria-form/categoria-form.component';
import { FuncionesService } from 'src/app/servicios/funciones.service';

@Component({
  selector: 'app-por-marca-categoria',
  templateUrl: './por-marca-categoria.component.html',
  styleUrls: ['./por-marca-categoria.component.css']
})
export class PorMarcaCategoriaComponent implements OnInit {

  @ViewChild('nombreProducto') nombreProducto;

  marcas: any[] = [];
  marcaElegidaId: string;

  categorias1: any[] = [];
  categoria1ElegidaId: string;

  categorias2: any[] = [];
  categoria2ElegidaId: string;

  categorias3: any[] = [];
  categoria3ElegidaId: string;

  categorias4: any[] = [];
  categoria4ElegidaId: string;

  etiqueta: string = 'Producto';

  productos: any[] = [];
  productosFiltrados: any[] = [];


  marcaTemp: any = {};

  opciones: any[] = [
    'Marca',
    'Referencia',
    'Modelo'
  ];

  otrasOpciones: any[] = [
    'Categoría',
    'EAN13',
    'EAN14',
    'Etiqueta'
  ];

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal,
    private funcionesService: FuncionesService
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
    // this.apiService.peticionGet('crear-arbol-sin-rya')
    this.apiService.peticionGet('crear-arbol')
      .subscribe(
        (data: any) => {
          this.categorias1 = data.categorias;
          // console.log(this.marcas);
        }
      )
  }

  elegirCategoria1() {
    this.productos = [];
    this.productosFiltrados = [];


    const CATEGORIA1 = this.categorias1.find(element => element._id === this.categoria1ElegidaId);
    this.categorias2 = CATEGORIA1.children;
    this.categoria2ElegidaId = undefined;
    this.categorias3 = [];
    this.categoria3ElegidaId = undefined;
    this.categorias4 = [];
    this.categoria4ElegidaId = undefined;


    // this.apiService.peticionGet(`productos-por-categoria-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=${this.etiqueta}&categoria=${this.categoria1ElegidaId}`)
    this.apiService.peticionGet(`productos-filtrados?marca=${this.marcaElegidaId}&categoria1=${this.categoria1ElegidaId}`)
      .subscribe((data: any) => {
        this.productos = data.productos;
        this.productosFiltrados = this.productos;
        // this.cargarBuscador();
      })

  }

  elegirCategoria2() {
    this.productos = [];
    this.productosFiltrados = [];

    const CATEGORIA2 = this.categorias2.find(element => element._id === this.categoria2ElegidaId);
    this.categorias3 = CATEGORIA2.children;
    this.categoria3ElegidaId = undefined;
    this.categorias4 = [];
    this.categoria4ElegidaId = undefined;

    // this.apiService.peticionGet(`productos-por-categoria-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=${this.etiqueta}&categoria=${this.categoria1ElegidaId}&categoria2=${this.categoria2ElegidaId}`)
    this.apiService.peticionGet(`productos-filtrados?marca=${this.marcaElegidaId}&categoria1=${this.categoria1ElegidaId}&categoria2=${this.categoria2ElegidaId}`)
      .subscribe((data: any) => {
        this.productos = data.productos;
        this.productosFiltrados = this.productos;
        // this.cargarBuscador();
      })
  }

  elegirCategoria3() {
    this.productos = [];
    this.productosFiltrados = [];

    const CATEGORIA3 = this.categorias3.find(element => element._id === this.categoria3ElegidaId);
    this.categorias4 = CATEGORIA3.children;
    this.categoria4ElegidaId = undefined;

    // if (CATEGORIA3.nombre === 'Repuestos y Accesorios') {
    // this.apiService.peticionGet(`productos-por-categoria-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=Repuesto&categoria=${this.categoria1ElegidaId}&categoria2=${this.categoria2ElegidaId}&categoria3=${this.categoria3ElegidaId}`)
    this.apiService.peticionGet(`productos-filtrados?marca=${this.marcaElegidaId}&categoria1=${this.categoria1ElegidaId}&categoria2=${this.categoria2ElegidaId}&categoria3=${this.categoria3ElegidaId}`)
      .subscribe((data: any) => {
        this.productos = data.productos;
        this.productosFiltrados = this.productos;
        // this.cargarBuscador();
      })
    // } else {
    // this.apiService.peticionGet(`productos-por-categoria-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=${this.etiqueta}&categoria=${this.categoria1ElegidaId}&categoria2=${this.categoria2ElegidaId}&categoria3=${this.categoria3ElegidaId}`)
    //   this.apiService.peticionGet(`productos-filtrados?marca=${this.marcaElegidaId}&categoria1=${this.categoria1ElegidaId}&categoria2=${this.categoria2ElegidaId}&categoria3=${this.categoria3ElegidaId}`)
    //       .subscribe((data: any) => {
    //         this.productos = data.productos;
    //         this.productosFiltrados = this.productos;
    //         this.cargarBuscador();
    //       })
    // }

  }

  elegirCategoria4() {

    this.productos = [];
    this.productosFiltrados = [];

    this.apiService.peticionGet(`productos-filtrados?marca=${this.marcaElegidaId}&categoria1=${this.categoria1ElegidaId}&categoria2=${this.categoria2ElegidaId}&categoria3=${this.categoria3ElegidaId}&categoria4=${this.categoria4ElegidaId}`)
      .subscribe((data: any) => {
        this.productos = data.productos;
        this.productosFiltrados = this.productos;
        console.log(this.productosFiltrados);
        
        // this.cargarBuscador();
      })

    // if (CATEGORIA.nombre === 'Repuestos y Accesorios') {
    //   this.apiService.peticionGet(`productos-por-categoria-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=Repuesto&categoria=${this.categoriaElegidaId}&categoria2=${this.subcategoriaElegidaId}&categoria3=${subcategoria2}`)
    //       .subscribe((data: any) => {
    //         this.productos = data.productos;
    //         this.productosFiltrados = this.productos;
    //         this.cargarBuscador();
    //       })
    // } else {
    //   this.apiService.peticionGet(`productos-por-categoria-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=${this.etiqueta}&categoria=${this.categoriaElegidaId}&categoria2=${this.subcategoriaElegidaId}&categoria3=${subcategoria2}`)
    //       .subscribe((data: any) => {
    //         this.productos = data.productos;
    //         this.productosFiltrados = this.productos;
    //         this.cargarBuscador();
    //       })
    // }

  }

  // buscar() {
  //   console.log(
  //     {
  //       marca: this.marcaElegidaId,
  //       categoria: this.categoriaElegidaId,
  //       subcategoria: this.subcategoriaElegidaId,
  //       subcategoria2: this.subcategoria2ElegidaId,
  //       etiqueta: this.etiqueta
  //     }
  //   );

  //   if (!this.etiqueta || !this.subcategoriaElegidaId || !this.marcaElegidaId) {
  //     swal(`:|`, `Hay campos obligatorios`, 'warning');
  //   } else {
  //     const CATEGORIABUSCAR = this.subcategoria2ElegidaId || this.subcategoriaElegidaId;
  //     this.apiService.peticionGet(`productos-por-categoria-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=${this.etiqueta}&categoria=${CATEGORIABUSCAR}`)
  //       .subscribe((data: any) => {
  //         this.productos = data.productos;
  //         this.productosFiltrados = this.productos;
  //         this.cargarBuscador();
  //       })
  //   }
  // }

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

    this.categoria1ElegidaId = undefined;
    this.categoria2ElegidaId = undefined;
    this.categoria3ElegidaId = undefined;
    this.categoria4ElegidaId = undefined;
    // this.categorias1 = [];
    this.categorias2 = [];
    this.categorias3 = [];
    this.categorias4 = [];

    this.apiService.peticionGet(`productos-por-marca-y-etiqueta?marca=${marca}&etiqueta=${this.etiqueta}`)
    // this.apiService.peticionGet(`productos-por-marca-y-etiqueta?marca=${marca}&etiqueta=${'Repuesto'}`)
      .subscribe((data: any) => {
        this.productos = data.productos;
        this.productosFiltrados = this.productos;
      })
  }


  ordenar(termino) {
    console.log('ORDENAR', termino);
    
    if (termino === 'modelo' || termino === 'referencia' || termino === 'ean13' || termino === 'ean14') {
      console.log('CARACTERISTICAS');
      this.productosFiltrados.sort(
        function (a, b) {
          if (a.caracteristicas[termino] > b.caracteristicas[termino]) {
            return 1;
          }
          if (a.caracteristicas[termino] < b.caracteristicas[termino]) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }
      )
    }

    if ( termino === 'nombre' || termino === 'etiqueta' ) {
      this.productosFiltrados.sort(
        function (a, b) {
          if (a[termino] > b[termino]) {
            return 1;
          }
          if (a[termino] < b[termino]) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }
      )
    }

    if ( termino === 'categoria' || termino === 'marca' ) {
      this.productosFiltrados.sort(
        function (a, b) {
          if (a[termino].nombre > b[termino].nombre) {
            return 1;
          }
          if (a[termino].nombre < b[termino].nombre) {
            return -1;
          }
          // a must be equal to b
          return 0;
        }
      )
    }
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

  mostrarModal(idProducto, nombreProducto, indice) {
    const modal = this.modalService.open(CategoriaFormComponent);
    modal.result.then(
      this.handleModalTodoFormClose.bind(this),
      this.handleModalTodoFormClose.bind(this)
    )
    modal.componentInstance.idProducto = idProducto;
    modal.componentInstance.nombreProducto = nombreProducto;
    modal.componentInstance.indice = indice;
  }

  handleModalTodoFormClose(response) {
    if (response === Object(response)) {
      this.productosFiltrados[response.indice].editarCategoria = false;
      this.productosFiltrados[response.indice].categoria.nombre = response.nombreCategoriaNueva;
    }
  }

  cambiarNombre(nombreNuevo, productoId, indice) {
    console.log({
      nombreNuevo, productoId, indice
    });

    const objetoNombre = {
      nombre: nombreNuevo,
      slug: this.funcionesService.stringToSlug(nombreNuevo)
    };

    this.apiService.peticionesPut(`editar-nombre/${productoId}`, objetoNombre)
      .subscribe((data: any) => {
        swal(`:)`, `Se cambió el nombre en la base de datos`, 'success');
        // console.log('Bien');
        // this.router.navigate(['productos', 'producto', data.producto._id]);
        this.productosFiltrados[indice].editarNombre = false;
      });
  }

  cambiarMarca(marcaIdNueva, marcaNombreNuevo, productoId, indice) {
    console.log({
      marcaIdNueva, productoId, indice, marcaNombreNuevo
    });


    const objetoMarca = {
      marca: marcaIdNueva
    };

    this.apiService.peticionesPut(`editar-marca/${productoId}`, objetoMarca)
      .subscribe((data: any) => {
        swal(`:)`, `Se cambió la marca en la base de datos`, 'success');
        // console.log('Bien');
        // this.router.navigate(['productos', 'producto', data.producto._id]);
        this.productosFiltrados[indice].editarMarca = false;
        this.productosFiltrados[indice].marca.nombre = this.marcaTemp.nombre;
      });

  }

  crearMarcaTemp(marca) {
    console.log({ marca });

    this.marcaTemp = this.marcas.find(element => element._id === marca)

    console.log({ marcaTemp: this.marcaTemp });

  }

  cambiarModelo(modeloNuevo, productoId, indice) {
    console.log({ modeloNuevo, productoId, indice });

    const PRODUCTO = this.productosFiltrados[indice];
    const CARACTERISTICAS = PRODUCTO.caracteristicas;
    CARACTERISTICAS.modelo = modeloNuevo;

    console.log({ CARACTERISTICAS });

    this.apiService.peticionesPut(`editar-caracteristicas/${productoId}`, CARACTERISTICAS)
      .subscribe((data: any) => {
        swal(`:)`, `Se cambió el nombre en la base de datos`, 'success');
        this.productosFiltrados[indice].editarModelo = false;
      });
  }

  cambiarReferencia(referenciaNueva, productoId, indice) {
    console.log({ referenciaNueva, productoId, indice });

    const PRODUCTO = this.productosFiltrados[indice];
    const CARACTERISTICAS = PRODUCTO.caracteristicas;
    CARACTERISTICAS.referencia = referenciaNueva;

    console.log({ CARACTERISTICAS });

    this.apiService.peticionesPut(`editar-caracteristicas/${productoId}`, CARACTERISTICAS)
      .subscribe((data: any) => {
        swal(`:)`, `Se cambió el nombre en la base de datos`, 'success');
        this.productosFiltrados[indice].editarReferencia = false;
      });
  }

  cambiarEAN13(ean13Nuevo, productoId, indice) {
    console.log({ ean13Nuevo, productoId, indice });

    const PRODUCTO = this.productosFiltrados[indice];
    const CARACTERISTICAS = PRODUCTO.caracteristicas;
    CARACTERISTICAS.ean13 = ean13Nuevo;

    console.log({ CARACTERISTICAS });

    this.apiService.peticionesPut(`editar-caracteristicas/${productoId}`, CARACTERISTICAS)
      .subscribe((data: any) => {
        swal(`:)`, `Se cambió el ean13 en la base de datos`, 'success');
        this.productosFiltrados[indice].editarEAN13 = false;
      });
  }

  cambiarEAN14(ean14Nuevo, productoId, indice) {
    console.log({ ean14Nuevo, productoId, indice });

    const PRODUCTO = this.productosFiltrados[indice];
    const CARACTERISTICAS = PRODUCTO.caracteristicas;
    CARACTERISTICAS.ean14 = ean14Nuevo;

    console.log({ CARACTERISTICAS });

    this.apiService.peticionesPut(`editar-caracteristicas/${productoId}`, CARACTERISTICAS)
      .subscribe((data: any) => {
        swal(`:)`, `Se cambió el ean14 en la base de datos`, 'success');
        this.productosFiltrados[indice].editarEAN14 = false;
      });
  }


  cambiarEtiqueta(etiquetaNueva, productoId, indice) {
    console.log({
      etiquetaNueva, productoId, indice
    });

    const objetoEtiqueta = {
      etiqueta: etiquetaNueva
    };

    this.apiService.peticionesPut(`editar-etiqueta/${productoId}`, objetoEtiqueta)
      .subscribe((data: any) => {
        swal(`:)`, `Se cambió el nombre en la base de datos`, 'success');
        // console.log('Bien');
        // this.router.navigate(['productos', 'producto', data.producto._id]);
        this.productosFiltrados[indice].editarEtiqueta = false;
      });
  }

}
