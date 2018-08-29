import { Component, OnInit } from '@angular/core';
import { UrlFirebaseService } from '../../../servicios/url-firebase.service';
import { ApiService } from '../../../servicios/api.service';
import { ActivatedRoute } from '@angular/router';
import { AngularFireStorage } from 'angularfire2/storage';

@Component({
  selector: 'app-agregar-imagenes',
  templateUrl: './agregar-imagenes.component.html',
  styleUrls: ['./agregar-imagenes.component.css']
})
export class AgregarImagenesComponent implements OnInit {

  coleccion: any[] = [];
  productoId: string;
  pp: number = 1;
  producto: any;

  constructor(
    public servicioURL: UrlFirebaseService,
    private apiService: ApiService,
    private route: ActivatedRoute,
    private storage: AngularFireStorage
  ) { }

  ngOnInit() {
    this.productoId = this.route.snapshot.params.id;
    console.log(this.productoId);
    this.cargarProducto();
  }

  cargarProducto() {
    this.apiService.peticionGet(`productos/${this.productoId}`)
      .subscribe((data: any) => {
        this.producto = data.producto;
        console.log(this.producto);
      });
  }

  loadImages(event) {
    this.coleccion = event.target.files;
    console.log(this.coleccion);
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

  elegir(indice) {
    this.pp = indice + 1;
  }

  eliminarImagen(imagen: string, indice: number) {
    console.log(imagen);
    console.log(imagen.includes('thumb%40100_'));
    const ref = imagen.split('bigsaledev.appspot.com/o/')[1].split('?alt=')[0];
    const newRef = ref.replace('%2F', '/');
    const newRef2 = newRef.replace('%40', '@');
    console.log(ref);
    console.log(newRef);
    console.log(newRef2);
    const refArray = [ newRef2, newRef2.replace('thumb@100_', ''), newRef2.replace('thumb@100_', 'thumb@300_') ];

    refArray.forEach((element) => {
      const desertRef = this.storage.ref(element);
      desertRef.delete();
    });

    this.producto.pictures.large.splice(indice, 1);
    this.producto.pictures.small.splice(indice, 1);
    this.producto.pictures.medium.splice(indice, 1);

    // // Create a reference to the file to delete
    // const desertRef = this.storage.ref(newRef2);
    // // Delete the file
    // desertRef.delete();

    const pictures = {
      pp: 1,
      large: this.producto.pictures.large,
      medium: this.producto.pictures.medium,
      small: this.producto.pictures.small
    };

    if (indice >= this.producto.pictures.pp || this.producto.pictures.pp === 1 ) {
      console.log('primera condición');
      console.log(indice, this.producto.pictures.pp);
      pictures.pp = this.producto.pictures.pp;
    } else {
      console.log(indice, this.producto.pictures.pp);
      console.log('segunda condición');
      pictures.pp = this.producto.pictures.pp - 1;
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
