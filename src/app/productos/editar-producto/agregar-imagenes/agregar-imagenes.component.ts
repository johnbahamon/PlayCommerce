import { Component, OnInit } from '@angular/core';
import { UrlFirebaseService } from '../../../servicios/url-firebase.service';
import { ApiService } from '../../../servicios/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-imagenes',
  templateUrl: './agregar-imagenes.component.html',
  styleUrls: ['./agregar-imagenes.component.css']
})
export class AgregarImagenesComponent implements OnInit {

  coleccion: any[] = [];
  productoId: string;
  pp: number = 1;

  constructor(
    public servicioURL: UrlFirebaseService,
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productoId = this.route.snapshot.params.id;
    console.log(this.productoId);
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

}
