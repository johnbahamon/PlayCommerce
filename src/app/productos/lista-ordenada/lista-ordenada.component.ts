import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import swal from 'sweetalert';
import { FuncionesService } from 'src/app/servicios/funciones.service';

@Component({
  selector: 'app-lista-ordenada',
  templateUrl: './lista-ordenada.component.html',
  styleUrls: ['./lista-ordenada.component.css']
})
export class ListaOrdenadaComponent implements OnInit {

  @ViewChild('nombreProducto') nombreProducto;

  marcas: any[] = [];
  marcaElegidaId: string;

  etiqueta: string;

  productos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(
    private apiService: ApiService,
    private funcionesService: FuncionesService
  ) { }

  ngOnInit() {
    this.cargarMarcas();
  }

  cargarMarcas() {
    this.apiService.peticionGet('nombre-marcas-lista-completa')
      .subscribe(
        (data: any) => {
          this.marcas = data.marcas;
          // console.log(this.marcas);
        }
      )
  }

  buscar() {
    if (!this.etiqueta || !this.marcaElegidaId) {
      swal(`:|`, `No has elegido la marca o la etiqueta`, 'warning');
    } else {
      this.apiService.peticionGet(`productos-por-marca-y-etiqueta?marca=${this.marcaElegidaId}&etiqueta=${this.etiqueta}`)
        .subscribe((data: any) => {
          this.productos = data.productos;
          this.productosFiltrados = this.productos;          
        })
    }
  }

  cambiarNombre(nombre, id, indice) {
    console.log({nombre, id, indice});

    const objetoNombre = {
      nombre: nombre,
      slug: this.funcionesService.stringToSlug(nombre)
    };

    this.apiService.peticionesPut(`editar-nombre/${id}`, objetoNombre)
      .subscribe((data: any) => {
        swal(`:)`, `Se cambió el nombre en la base de datos`, 'success');
        // console.log('Bien');
        // this.router.navigate(['productos', 'producto', data.producto._id]);
        this.productosFiltrados[indice].editar = false;
      });

  }

}
