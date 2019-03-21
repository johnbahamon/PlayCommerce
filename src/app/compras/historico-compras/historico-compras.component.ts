import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/servicios/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-historico-compras',
  templateUrl: './historico-compras.component.html',
  styleUrls: ['./historico-compras.component.css']
})
export class HistoricoComprasComponent implements OnInit {

  productoId: string;

  constructor(
    private apiService: ApiService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.encontrarId();
    this.buscarCompras();
  }

  encontrarId() {
    this.productoId = this.route.snapshot.params.id;
  }

  buscarCompras() {
    this.apiService.peticionGet('historico-compras/' + this.productoId)
      .subscribe((response: any) => {
        console.log(response);
      })
  }

}
