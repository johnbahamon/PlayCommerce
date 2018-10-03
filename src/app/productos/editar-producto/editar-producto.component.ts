import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { BusquedaProductosService } from '../../servicios/busqueda-productos.service';

import { fromEvent } from 'rxjs';
import { map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-editar-producto',
  templateUrl: './editar-producto.component.html',
  styleUrls: ['./editar-producto.component.css']
})
export class EditarProductoComponent implements OnInit {

  @ViewChild('inputProducto') inputProducto;

  productoId: string;
  producto: any;
  cargando: boolean = true;

  productosFiltrados: any[] = [];

  repuestos: any[] = [];
  accesorios: any[] = [];

  repuestosId: any[] = [];
  accesoriosId: any[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private busquedaProductosService: BusquedaProductosService
  ) { }

  ngOnInit() {
    this.encontrarId();
    this.cargarProductos();
  }

  cargarProducto() {
    this.apiService.peticionGet('productos/' + this.productoId)
      .subscribe((data: any) => {
        this.producto = data.producto;
        this.repuestosId = this.producto.repuestos.map(el => el._id);
        this.accesoriosId = this.producto.accesorios.map(el => el._id);
        this.cargando = false;
      });
  }

  encontrarId() {
    this.productoId = this.route.snapshot.params.id;
    this.cargarProducto();
  }

  cargarProductos() {
    this.busquedaProductosService.obtenerProductos('productos-lista-completa');

    fromEvent(this.inputProducto.nativeElement, 'keyup').pipe(debounceTime(400)
      , distinctUntilChanged()
      , map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
      , switchMap(title => this.busquedaProductosService.obtenerProductosFiltrados(title)))
      .subscribe((productos: any) => {
        this.productosFiltrados = productos;
        console.log(this.productosFiltrados);
      });
  }

  elegirRepuesto(repuesto) {
    if (this.repuestosId.includes(repuesto._id)) {
      swal(':(', 'Ya se encuentra en el array o base de datos', 'warning');
      return;
    }
    this.repuestos.push(repuesto);
    this.repuestosId.push(repuesto._id);
    this.productosFiltrados = [];
    this.inputProducto.nativeElement.focus();
    this.inputProducto.nativeElement.value = '';
  }

  elegirAccesorio(accesorio) {
    if (this.accesoriosId.includes(accesorio._id)) {
      swal(':(', 'Ya se encuentra en el array o base de datos', 'warning');
      return;
    }
    this.accesorios.push(accesorio);
    this.accesoriosId.push(accesorio._id);
    this.productosFiltrados = [];
    this.inputProducto.nativeElement.focus();
    this.inputProducto.nativeElement.value = '';
  }

  actualizarProducto() {
    const producto = {
      accesorios: this.accesoriosId,
      repuestos: this.repuestosId
    };

    this.apiService.peticionesPut(`productos/add/${this.productoId}`, producto)
      .subscribe((data: any) => {
        swal(':)', 'Producto Actualizado', 'success');
      });
  }
}
