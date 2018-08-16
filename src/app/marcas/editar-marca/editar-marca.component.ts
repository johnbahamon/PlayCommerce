import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { BusquedaService } from '../../servicios/busqueda.service';

import { fromEvent } from 'rxjs';
import { map, switchMap, distinctUntilChanged, debounceTime } from 'rxjs/operators';
import { ApiService } from '../../servicios/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-editar-marca',
  templateUrl: './editar-marca.component.html',
  styleUrls: ['./editar-marca.component.css']
})
export class EditarMarcaComponent implements OnInit {

  @ViewChild('inputCategoria') inputCategoria: ElementRef;

  categorias: any[] = [];
  categoriasElegidas: any[] = [];
  marcaId: string = '';

  constructor(
    private route: ActivatedRoute,
    private busquedaService: BusquedaService,
    private apiService: ApiService,
  ) {
    this.marcaId = route.snapshot.params.id;
  }

  ngOnInit() {
    this.cargarCategorias();
  }

  cargarCategorias() {
    this.busquedaService.obtenerCategorias('categorias');

    fromEvent(this.inputCategoria.nativeElement, 'keyup').pipe(debounceTime(400)
    , distinctUntilChanged()
    , map((event: KeyboardEvent) => (<HTMLInputElement>event.target).value)
    , switchMap(title => this.busquedaService.obtenerCategoriasFiltradasPrincipales(title)))
    .subscribe((categories: any) => {
      this.categorias = categories;
    });
  }

  elegirCategoria(categoria_id) {
    this.categoriasElegidas.push(categoria_id);
    this.categorias = [];
    this.inputCategoria.nativeElement.value = '';
    this.inputCategoria.nativeElement.focus();
  }

  quitarCategoria(categoria_indice) {
    this.categoriasElegidas.splice(categoria_indice, 1);
  }

  editarMarca() {
    const url = 'marcas/' + this.marcaId;
    this.apiService.peticionesPut(url, {categorias: this.categoriasElegidas})
      .subscribe((data: any) => {
        swal('Excelente', 'Marca Actualizada', 'success');
      });
  }

}
