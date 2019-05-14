import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-ordenes',
  templateUrl: './ordenes.component.html',
  styleUrls: ['./ordenes.component.css']
})
export class OrdenesComponent implements OnInit {

  ordenes: any[] = [];
  totalOrdenes: number = 0;

  ordenElegida: any;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.cargarOrdenes();
  }

  cargarOrdenes() {
    this.apiService.peticionGet('ordenes-pos')
      .subscribe((data: any) => {
        this.ordenes = data.ventas;
        this.totalOrdenes = data.total;
        console.log({data});
        
      });
  }

  elegirOrden(indice) {
    this.ordenElegida = this.ordenes[indice];
  }

  modificarOrden(ordenId, etiqueta) {
    const INDICE = this.ordenes.find(element => element._id === ordenId);
    if(!etiqueta) {
      this.apiService.peticionesDelete(`ordenes-pos/${ordenId}`)
        .subscribe((data: any) => {
          this.ordenElegida = undefined;
          this.ordenes.splice(INDICE, 1);
          this.totalOrdenes = this.ordenes.length;
        })
    } else {
      const ETIQUETA = {
        etiqueta
      }
      this.apiService.peticionesPut(`ordenes-pos/${ordenId}`, ETIQUETA)
        .subscribe((data: any) => {
          this.ordenElegida = undefined;
          this.ordenes.splice(INDICE, 1);
          this.totalOrdenes = this.ordenes.length;
        })
    }
  }

}
