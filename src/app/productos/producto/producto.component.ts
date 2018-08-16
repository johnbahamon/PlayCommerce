import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {

  productoId: string;
  producto: any;
  cargando: boolean = true;
  caracteristicas: string[] = [];
  detalles: string[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.encontrarId();
  }

  cargarProducto() {
    this.apiService.peticionGet('productos/' + this.productoId)
      .subscribe((data: any) => {
        this.producto = data.producto;
        this.cargando = false;
        this.caracteristicas = Object.keys(this.producto.caracteristicas);
        this.detalles = Object.keys(this.producto.detalles);
        console.log(this.producto);
      });
  }

  encontrarId() {
    this.productoId = this.route.snapshot.params.id;
    this.cargarProducto();
  }

}
