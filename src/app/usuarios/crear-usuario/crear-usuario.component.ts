import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../servicios/api.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-crear-usuario',
  templateUrl: './crear-usuario.component.html',
  styleUrls: ['./crear-usuario.component.css']
})
export class CrearUsuarioComponent implements OnInit {

  nombre: string;
  tipoId: string;
  numeroId: string;
  ciudad: string;
  direccion: string;
  tipo: string;
  telefono: string;

 constructor(
   private apiService: ApiService
 ) { }

  ngOnInit() {
  }

  crearProveedor(form: NgForm) {
    const formValues = Object.assign({}, form.value);
    const formKeys = Object.keys(formValues);
    console.log(formValues);
    console.log(formKeys);

    for (let i = 0; i < formKeys.length; i++) {
      if (!formValues[formKeys[i]]) {
        console.log(formKeys[i]);
        swal(':(', 'Valores no definidos en el formulario', 'warning');
        return;
      }
    }

    console.log('Todo va bien');

    this.apiService.peticionesPost('usuarios', formValues)
      .subscribe((data: any) => {
        swal('Muy Bien', 'Usuario creado correctamente', 'success');
        console.log(data);
      });
  }

}
