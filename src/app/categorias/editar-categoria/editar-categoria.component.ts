import { FuncionesService } from './../../servicios/funciones.service';
import { ApiService } from './../../servicios/api.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent implements OnInit {

  categoriaId: string;
  cargando: boolean = true;

  categoria: any;

  nombre: string;
  detalles: Array<any>;

  detalleEditar: any;
  detalle: string;
  opciones: any;
  unidades: any;
  opcion: string;
  unidad: string;

  agregarDetalle: boolean = false;
  agregarOpcion: boolean = false;
  agregarUnidad: boolean = false;
  mostrarBotones: boolean = true;



  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private funcionesService: FuncionesService
  ) { }

  ngOnInit() {
    this.encontrarId();
  }

  encontrarId() {
    this.categoriaId = this.route.snapshot.params.id;
    this.cargarCategoria();
  }

  cargarCategoria() {
    this.apiService.peticionGet('categorias/' + this.categoriaId)
      .subscribe((data: any) => {
        this.categoria = data.categoria;
        this.cargando = false;
        this.nombre = this.categoria.nombre;
        this.detalles = this.categoria.detalles;
        console.log(this.categoria);
      });
  }

  agregarOpcionParcial() {
    if (!this.opcion) {
      swal(':(', 'No escribiste nada', 'warning');
      return;
    }
    this.opciones.push(this.opcion);
    this.opcion = '';
  }

  agregarUnidadParcial() {
    if (!this.unidad) {
      swal(':(', 'No escribiste nada', 'warning');
      return;
    }
    this.unidades.push(this.unidad);
    this.unidad = '';
  }

  agregarDetalleParcial() {
    if (!this.detalle) {
      swal(':(', 'No escribiste nada', 'warning');
      return;
    }

    if (this.agregarOpcion && this.opcion) {
      swal('Tienes una opción escrita', 'Borrala o Agregala', 'warning');
      return;
    }

    if (this.agregarUnidad && this.unidad) {
      swal('Tienes una unidad escrita', 'Borrala o Agregala', 'warning');
      return;
    }

    const detalleParcial = [];
    detalleParcial[0] = this.detalle;
    detalleParcial[1] = this.funcionesService.stringToSlug(this.detalle);
    detalleParcial[2] = this.opciones || null;
    detalleParcial[3] = this.unidades || null;

    this.detalles.push(detalleParcial);

    console.log(detalleParcial);

    this.opciones = null;
    this.unidades = null;
    this.detalle = '';

    this.mostrarBotones = true;
    this.agregarUnidad = false;
    this.agregarOpcion = false;

    this.agregarDetalle = false;
  }

  actualizarCategoria() {
    if (!this.nombre) {
      swal(':(', 'No tienes título en la categoría', 'warning');
      return;
    }

    const objetoEditado = {
      nombre: this.nombre,
      slug: this.funcionesService.stringToSlug(this.nombre),
      detalles: this.detalles,
    };

    this.apiService.peticionesPut(`categorias/${this.categoria._id}`, objetoEditado)
      .subscribe((data: any) => {
        swal(':)', 'Categoría Editada Perfectamente', 'success');
      });

  }

  subir(indice) {
    this.detalles.splice(indice - 1, 0, this.detalles[indice]);
    this.detalles.splice(indice + 1, 1);
  }

  bajar(indice) {
    this.detalles.splice(indice + 2, 0, this.detalles[indice]);
    this.detalles.splice(indice, 1);
  }

}
