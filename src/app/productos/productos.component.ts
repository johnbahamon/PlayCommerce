import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  productos: any[] = [];
  cargando: boolean = true;

  desde: number = 0;
  totalProductos: number = 0;

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.cargarProductos();
  }

  cargarProductos() {
    this.apiService.peticionGet('productos')
      .subscribe((data: any) => {
        this.productos = data.productos;
        this.cargando = false;
      });
  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalProductos ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarProductos();

  }

}
