import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';

@Component({
  selector: 'app-editar-compra',
  templateUrl: './editar-compra.component.html',
  styleUrls: ['./editar-compra.component.css']
})
export class EditarCompraComponent implements OnInit {

  postId: string;
  url: string;

  invoice: any;

  productosEncontrados: Array<any> = [];

  // Valores Iniciales
  productosElegidos: any[] = [];
  grossTotal: number = 0;
  discounts: number = 0;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  Math: any;

  constructor(
    private route: ActivatedRoute,
    public _apiService: ApiService
  ) {
    this.Math = Math;
    route.params.subscribe(
      params => {
        this.postId = params['id'];
      }
    );

    this.url = 'compras/' + this.postId;

    this._apiService.peticionGet( this.url )
      .subscribe( (data: any) => {
        this.invoice = data.invoice;
        console.log(this.invoice);
        this.inicializarVariables();
      });
  }

  ngOnInit() {
  }

  inicializarVariables() {
    this.productosElegidos = this.invoice.products;
    this.grossTotal = this.invoice.grossTotal;
    this.discounts = this.invoice.discounts;
    this.subtotal = this.invoice.subtotal;
    this.iva = this.invoice.iva;
    this.total = this.invoice.total;
  }

}
