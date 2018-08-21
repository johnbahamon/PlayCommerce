import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-agregar-descripcion',
  templateUrl: './agregar-descripcion.component.html',
  styleUrls: ['./agregar-descripcion.component.css']
})
export class AgregarDescripcionComponent implements OnInit {

  productoId: string;

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.productoId = this.route.snapshot.params.id;
  }

}
