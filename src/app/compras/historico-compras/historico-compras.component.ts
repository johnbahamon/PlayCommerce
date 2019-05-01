import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-historico-compras',
  templateUrl: './historico-compras.component.html',
  styleUrls: ['./historico-compras.component.css']
})
export class HistoricoComprasComponent implements OnInit {

  productoId: string;
  compras: any[] = [];
  combos: any[] = [];

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.encontrarId();
    this.buscarCompras();
    this.buscarCombos();
  }

  encontrarId() {
    this.productoId = this.route.snapshot.params.id;
  }

  buscarCompras() {
    this.apiService.peticionGet('historico-compras/' + this.productoId)
      .subscribe((response: any) => {
        console.log({compras: response});
        
        const compras = response.compras;
        this.compras = [];
        compras.forEach(element => {
          const compra = {
            _id: element._id,
            supplierDate: element.supplierDate,
            linea: element.products.find(element2 => element2.productId._id === this.productoId)
          }
          this.compras.push(compra);
        });

        this.compras.sort(
          function (a, b) {
            if (a.supplierDate > b.supplierDate) {
              return 1;
            }
            if (a.supplierDate < b.supplierDate) {
              return -1;
            }
            // a must be equal to b
            return 0;
          }
        )
        // console.log(this.compras);  
        // this.compras = []      
      })
  }

  buscarCombos() {
    this.apiService.peticionGet('historico-combos/' + this.productoId)
      .subscribe((response: any) => {
        console.log({combos: response});
        
        const combos = response.combos;
        this.combos = [];
        combos.forEach(element => {
          const combo = {
            _id: element._id,
            supplierDate: element.supplierDate,
            linea: element.products.find(element2 => element2.productId._id === this.productoId)
          }
          this.combos.push(combo);
        });
        // console.log(this.combos);  
        // this.compras = []      
      })
  }

  irACompra(compraId) {
    this.router.navigate(['compras', 'compra', compraId])
  }

}
