import { ApiService } from './../servicios/api.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {

  ventas: any[] = [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.cargarVentas();
  }

  cargarVentas() {
    this.apiService.peticionGet('ventas')
      .subscribe((data: any) => {
        this.ventas = data.ventas;
        console.log(this.ventas);
      });
  }

}
