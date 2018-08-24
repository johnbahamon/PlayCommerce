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
        console.log(this.categorias);
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

  crearArbol() {
    this.apiService.peticionGet('categorias-lista-completa')
      .subscribe((resultado: any) => {
        const data = resultado.categorias;
        // console.log(data);
        const indexed_nodes = {}, tree_roots = [];
        for (let k = 0; k < data.length; k += 1) {
          // console.log(k);
          data[k].children = [];
          // console.log(data[k]);
        }
        for (let i = 0; i < data.length; i += 1) {
            // console.log(i);
            indexed_nodes[data[i]._id] = data[i];
        }
        for (let j = 0; j < data.length; j += 1) {
          // console.log(j);
          // console.log(data[j]);
            const parent = data[j].parent;
            if (parent === undefined) {
                tree_roots.push(data[j]);
            } else {
                indexed_nodes[parent].children.push(data[j]);
            }
        }
        console.log(JSON.stringify(tree_roots, undefined, '\t'));
      });
  }

}
