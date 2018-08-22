import { Component, OnInit } from '@angular/core';
import { ApiService } from '../servicios/api.service';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.css']
})
export class ComprasComponent implements OnInit {

  invoices: Array<any>;

  constructor(
    public _apiService: ApiService
  ) { }

  ngOnInit() {
    this.loadInvoices();
  }

  loadInvoices() {
    this._apiService.peticionGet('compras')
    .subscribe( (data: any) => {
      this.invoices = data.invoices;
    });
  }

  deleteInvoice( invoiceId ) {
    // this._apiService.peticionesDELETE('/invoices/' + invoiceId )
    //   .subscribe( (data: any) => {
    //     swal('Ok', 'Producto Eliminado con Exito', 'success');
    //     this.loadInvoices();
    //   });
  }

}
