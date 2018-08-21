import { ApiService } from './../../../servicios/api.service';
import { UrlFirebaseService } from './../../../servicios/url-firebase.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-descripcion',
  templateUrl: './agregar-descripcion.component.html',
  styleUrls: ['./agregar-descripcion.component.css']
})
export class AgregarDescripcionComponent implements OnInit {

  texto: string;
  alineacion: string;

  coleccion: any[] = [];

  productoId: string;

  constructor(
    private route: ActivatedRoute,
    public servicioURL: UrlFirebaseService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.productoId = this.route.snapshot.params.id;
  }

  agregarDescripcion() {

    const descripcionArray = [];

    const descripcion = {
      alineacion: this.alineacion,
      texto: this.texto,
      imagen: this.servicioURL.obtenerUrls()[0]
    };

    descripcionArray.push(descripcion);

    console.log(descripcion);

    this.apiService.peticionesPut('productos/agregar-descripcion/' + this.productoId, descripcionArray)
      .subscribe((data: any) => {
        swal('Muy Bien', 'Descripción agregada con éxito', 'success');
        this.servicioURL.resetear();
        this.coleccion = [];
      });
  }

  loadImages(event) {
    this.coleccion = event.target.files;
    console.log(this.coleccion);
  }

}
