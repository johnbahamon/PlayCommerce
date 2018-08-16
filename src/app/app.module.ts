import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { AppComponent } from './app.component';
import { ProductosComponent } from './productos/productos.component';
import { MarcasComponent } from './marcas/marcas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CrearMarcaComponent } from './marcas/crear-marca/crear-marca.component';
import { CrearCategoriaComponent } from './categorias/crear-categoria/crear-categoria.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { CustomCanvasComponent } from './productos/crear-producto/custom-canvas/custom-canvas.component';
import { EditarCategoriaComponent } from './categorias/editar-categoria/editar-categoria.component';
import { EditarMarcaComponent } from './marcas/editar-marca/editar-marca.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductosComponent,
    MarcasComponent,
    CategoriasComponent,
    CrearMarcaComponent,
    CrearCategoriaComponent,
    CrearProductoComponent,
    CustomCanvasComponent,
    EditarCategoriaComponent,
    EditarMarcaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
