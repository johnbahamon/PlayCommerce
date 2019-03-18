import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/servicios/api.service';
import { BusquedaProductosService } from 'src/app/servicios/busqueda-productos.service';

import { fromEvent } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-editar-compra',
  templateUrl: './editar-compra.component.html',
  styleUrls: ['./editar-compra.component.css']
})
export class EditarCompraComponent implements OnInit, AfterViewInit {

  @ViewChild('searchProd') searchProd;
  productSearch: string;

  postId: string;
  url: string;

  invoice: any;

  productosEncontrados: Array<any> = [];

  // Valores Iniciales
  productosElegidos: any[] = [];
  idProductosElegidos: Array<any> = [];
  grossTotal: number = 0;
  discounts: number = 0;
  subtotal: number = 0;
  iva: number = 0;
  total: number = 0;

  Math: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    public _apiService: ApiService,
    public busquedaProductosService: BusquedaProductosService
  ) {
    this.Math = Math;

  }

  ngOnInit() {
    this.route.params.subscribe(
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
        this.obtenerProductos();
      });   
  }

  ngAfterViewInit() {
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

  inicializarVariables() {
    this.productosElegidos = this.invoice.products.map(element => {
      return {
        discount: element.discount,
        discount2: element.discount2,
        productId: element.productId._id,
        productName: element.productId.nombre,
        qty: element.qty,
        tax: element.tax,
        unitValue: element.unitValue,
        withTax: element.withTax,
        withTaxUnit: element.withTaxUnit,
      }
    });

    console.log('PRODUCTOS DESDE EL API');
    console.log(this.invoice.products);
    console.log('PRODUCTOS DESDE EL API');   
    
    console.log('PRODUCTOS TRANSFORMADOS');
    console.log(this.productosElegidos);
    console.log('PRODUCTOS TRANSFORMADOS');   
    
    this.idProductosElegidos = this.productosElegidos.map(element => element.productId);

    console.log('PRODUCTOS IDs');
    console.log(this.idProductosElegidos);
    console.log('PRODUCTOS IDs');   

    this.grossTotal = this.invoice.grossTotal;
    this.discounts = this.invoice.discounts;
    this.subtotal = this.invoice.subtotal;
    this.iva = this.invoice.iva;
    this.total = this.invoice.total;
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

    // console.log('products', productsInvoice);
    // console.log('grossTotal', this.grossTotal);
    // console.log('discounts', this.discounts);
    // console.log('subtotal', this.subtotal);
    // console.log('iva', this.iva);
    // console.log('total', this.total);


    const invoice = {
      // supplierDate: this.supplierDate,
      // paymentMethod: this.paymentMethod,
      // dueDate: undefined,
      // // supplierDate: this.supplierDate.getTime() + 1000 * 60 * 60 * 12,
      // supplier: this.proveedorElegido._id,
      // supplierNumber: this.supplierNumber,
      products: productsInvoice,
      grossTotal: this.grossTotal,
      discounts: this.discounts,
      subtotal: this.subtotal,
      iva: this.iva,
      total: this.total
    };

    console.log(invoice);

    // if (this.paymentMethod === 'credito') {
    //   invoice.dueDate = this.dueDate;
    // }

    this._apiService.peticionesPut(`compras/${this.postId}`, invoice)
      .subscribe( (data: any) => {
        swal('Compra', 'Creada con Exito', 'success');
        this.router.navigateByUrl(`compras/compra/${this.postId}`)
      });


  }

}
