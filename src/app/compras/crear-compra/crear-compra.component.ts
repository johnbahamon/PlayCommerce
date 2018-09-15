import { BusquedaProveedoresService } from './../../servicios/busqueda-proveedores.service';
import { BusquedaProductosService } from './../../servicios/busqueda-productos.service';
import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-crear-compra',
  templateUrl: './crear-compra.component.html',
  styleUrls: ['./crear-compra.component.css']
})
export class CrearCompraComponent implements OnInit, AfterViewInit {

  @ViewChild('searchSup') searchSup;
  @ViewChild('searchProd') searchProd;

  Math: any;

  hoy: Date = new Date();

  // suppliers: Array<any>;

  proveedoresEncontrados: Array<any> = [];
  proveedorElegido: any;

  productosEncontrados: Array<any> = [];
  productoElegido: any;

  productosElegidos: Array<any> = [];
  idProductosElegidos: Array<any> = [];

  grossTotal: number = 0;
  discounts: number = 0;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  invoice: any = {
    total: this.total
  };

  // values
  productSearch: string;

  // ValoresGuardar
  supplierDate: Date;
  supplierNumber: string;

  constructor(
    public busquedaProductosService: BusquedaProductosService,
    public busquedaProvedoresService: BusquedaProveedoresService,
    public _apiService: ApiService
  ) {
    this.Math = Math;
  }

  ngOnInit() {}

  ngAfterViewInit() {
    this.obtenerSuppliers();
    this.obtenerProductos();
  }

  obtenerSuppliers() {
    this.busquedaProvedoresService.obtenerProveedores('usuarios-por-tipo-lista-completa?tipo=proveedor');

    fromEvent(this.searchSup.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value),
        switchMap(title => this.busquedaProvedoresService.obtenerProveedoresFiltrados(title)))
      .subscribe((suppliers: any) => {
        this.proveedoresEncontrados = suppliers;
      });
  }

  elegirProveedor( supplier ) {
    this.proveedorElegido = supplier;
  }

  obtenerProductos() {
    this.busquedaProductosService.obtenerProductos('productos-lista-completa');

    fromEvent(this.searchProd.nativeElement, 'keyup')
      .pipe(
        debounceTime(400),
        distinctUntilChanged(),
        map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value),
        switchMap(title => this.busquedaProductosService.obtenerProductosFiltrados(title)))
    .subscribe((productNames: any) => {
      this.productosEncontrados = productNames;
    });
  }

  elegirProducto( producto ) {

    if (!this.idProductosElegidos.includes(producto._id)) {
      const product = {
        productId: producto._id,
        productName: producto.nombre,
        qty: 1,
        unitValue: 0,
        discount: 0,
        discount2: 0,
        tax: 19,
        withTax: 0,
        withTaxUnit: 0
      };
      // console.log(product);

      this.productosElegidos[this.productosElegidos.length] = product;

      this.idProductosElegidos.push(product.productId);
      this.productSearch = '';
      this.productosEncontrados = [];
      console.log(this.productosElegidos);
    }

  }

  trackByProductId(index: number, product: any): number {
    return index;
  }



  eliminarProducto( i ) {
    this.productosElegidos.splice(i, 1);
    this.idProductosElegidos.splice(i, 1);
    this.actualizar(i);
  }

  actualizar(e) {
    let _grossTotal = 0;
    let _discounts = 0;

    for ( const product of this.productosElegidos ) {
      _grossTotal += product.qty * product.unitValue;
      _discounts += ( product.qty * product.unitValue * ( 10000 - (( 100 - product.discount ) * ( 100 - product.discount2 )))) / 10000;
    }

    this.grossTotal = Math.round(_grossTotal);
    this.discounts = Math.round(_discounts);
    this.subtotal = Math.round(this.grossTotal - this.discounts);
    this.iva = Math.round(this.subtotal * 0.19);
    this.total = Math.round(this.subtotal + this.iva);
  }

  prueba() {
    console.log('supplierDate', this.supplierDate);
    console.log('supplier', this.proveedorElegido._id);
    console.log('supplierNumber', this.supplierNumber);

    const productsInvoice = [];

    this.productosElegidos.forEach( (element: any) => {
      const productInvoice = {
        productId: element.productId,
        qty: element.qty,
        unitValue: element.unitValue,
        discount: element.discount,
        discount2: element.discount2,
        tax: element.tax,
        // tslint:disable-next-line:max-line-length
        withTax: Math.round( 1.19 * ( element.qty * element.unitValue ) * ( 1 - ( element.discount / 100 ) ) * ( 1 - ( element.discount2 / 100 ) ) ),
        // tslint:disable-next-line:max-line-length
        withTaxUnit: Math.round(( 1.19 * ( element.qty * element.unitValue ) * ( 1 - ( element.discount / 100 ) ) * ( 1 - ( element.discount2 / 100 ) ) ) / element.qty )
      };
      productsInvoice.push(productInvoice);
    });

    console.log('products', productsInvoice);
    console.log('grossTotal', this.grossTotal);
    console.log('discounts', this.discounts);
    console.log('subtotal', this.subtotal);
    console.log('iva', this.iva);
    console.log('total', this.total);


    const invoice = {
      supplierDate: this.supplierDate,
      // supplierDate: this.supplierDate.getTime() + 1000 * 60 * 60 * 12,
      supplier: this.proveedorElegido._id,
      supplierNumber: this.supplierNumber,
      products: productsInvoice,
      grossTotal: this.grossTotal,
      discounts: this.discounts,
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total
    };

    console.log(invoice);

    this._apiService.peticionesPost('compras', invoice)
      .subscribe( (data: any) => {
        swal('Compra', 'Creada con Exito', 'success');
      });


  }

}
