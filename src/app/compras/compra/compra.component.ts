import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../../servicios/api.service';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styleUrls: ['./compra.component.css']
})
export class CompraComponent implements OnInit {

  postId: string;
  url: string;

  invoice: any;

  constructor(
    private route: ActivatedRoute,
    public _apiService: ApiService
  ) {
    route.params.subscribe(
      params => {
        this.postId = params['id'];
      }
    );

    this.url = 'compras/' + this.postId;

    this._apiService.peticionGet( this.url )
      .subscribe( (data: any) => {
        this.invoice = data.invoice;
      });
  }

  ngOnInit() {
  }
}
