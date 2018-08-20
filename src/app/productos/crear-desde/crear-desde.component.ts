import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';
import { NgForm } from '@angular/forms';
import { FuncionesService } from '../../servicios/funciones.service';

@Component({
  selector: 'app-crear-desde',
  templateUrl: './crear-desde.component.html',
  styleUrls: ['./crear-desde.component.css']
})
export class CrearDesdeComponent implements OnInit {

  productoId: string;
  producto: any;
  cargando: boolean = true;

  caracteristicas = [
    ['Modelo', 'modelo', 'text'],
    ['Precio', 'precio', 'number'],
    ['Existencias', 'existencias', 'number'],
    ['Color', 'color', 'text'],
    ['Referencia', 'referencia', 'text'],
    ['CMMF', 'cmmf', 'text'],
    ['Código de Barras', 'codigo_de_barras', 'text'],
  ];

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private funcionesService: FuncionesService
  ) { }

  ngOnInit() {
    this.encontrarProducto();
  }

  encontrarProducto() {
    this.productoId = this.route.snapshot.params.id;
    console.log(this.productoId);
    this.cargarProducto();
  }

  cargarProducto() {
    this.apiService.peticionGet(`productos/${this.productoId}`)
      .subscribe((data: any) => {
        this.producto = data.producto;
        this.producto.pictures = [];
        console.log(this.producto);
        this.cargando = false;
      });
  }

  crearProducto(form: NgForm) {

    const formValues = Object.assign({}, form.value);
    console.log(formValues);
    console.log(this.producto);

    const producto = this.producto;
    producto.slug = this.funcionesService.stringToSlug(this.producto.nombre);
    producto.categoria_padre = this.producto.categoria_padre._id;

    this.caracteristicas.forEach(element => {
      producto.caracteristicas[element[1]] = formValues[element[1]];
    });

    console.log(producto);

    this.apiService.peticionesPost('productos', producto)
      .subscribe((data: any) => {
        swal('Muy Bien', 'Producto Copia Creado', 'success');
      });


  }

}
