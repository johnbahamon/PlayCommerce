import { Component } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  // mostrar = false;

  swalexample() {
    swal('Hello world!');
  }
}
