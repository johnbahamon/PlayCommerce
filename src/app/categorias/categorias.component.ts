import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-categorias',
  templateUrl: './categorias.component.html',
  styleUrls: ['./categorias.component.css']
})
export class CategoriasComponent implements OnInit {

  categorias: any[] = [];
  desde: number = 0;

  totalCategorias: number = 0;
  cargando: boolean = true;

  constructor( private apiService: ApiService ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.apiService.peticionGet('categorias?desde=' + this.desde)
      .subscribe((data: any) => {
        this.categorias = data.categorias;
        this.totalCategorias = data.total;
      });
  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;
    console.log(desde);

    if ( desde >= this.totalCategorias ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarCategorias();

  }

}
