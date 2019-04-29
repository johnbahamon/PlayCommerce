import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { BusquedaService } from 'src/app/servicios/busqueda-categorias.service';

import { fromEvent } from 'rxjs';
import { map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

  @ViewChild('inputCategoria') inputCategoria;

  categorias: any[] = [];
  cargando: boolean = true;

  constructor(
    public activeModal: NgbActiveModal,
    private busqueda: BusquedaService
  ) { }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    if (!this.busqueda.busquedaCargada) {
      this.busqueda.obtenerCategorias('categorias-lista-completa');
    }

    this.cargando = false;

    fromEvent(this.inputCategoria.nativeElement, 'keyup').pipe(debounceTime(400)
    , distinctUntilChanged()
    , map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
    , switchMap(title => this.busqueda.obtenerCategoriasFiltradas(title)))
    .subscribe((categories: any) => {
      this.categorias = categories;
      console.log(this.categorias);
    });
  }

  elegirCategoria(categoria) {
    console.log({categoria});
  }

}
