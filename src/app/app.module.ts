import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';

import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireStorageModule } from 'angularfire2/storage';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { ProductoComponent } from './productos/producto/producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { CrearProveedorComponent } from './proveedores/crear-proveedor/crear-proveedor.component';
import { ComprasComponent } from './compras/compras.component';
import { CrearCompraComponent } from './compras/crear-compra/crear-compra.component';
import { CrearDesdeComponent } from './productos/crear-desde/crear-desde.component';
import { AgregarImagenesComponent } from './productos/editar-producto/agregar-imagenes/agregar-imagenes.component';
import { AgregarDescripcionComponent } from './productos/editar-producto/agregar-descripcion/agregar-descripcion.component';
import { CompraComponent } from './compras/compra/compra.component';
import { VentasComponent } from './ventas/ventas.component';
import { CrearVentaComponent } from './ventas/crear-venta/crear-venta.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { UsuarioComponent } from './usuarios/usuario/usuario.component';
import { VentaComponent } from './ventas/venta/venta.component';
import { MarcaComponent } from './marcas/marca/marca.component';
import { CategoriaComponent } from './categorias/categoria/categoria.component';
import { EliminarImagenesComponent } from './productos/editar-producto/eliminar-imagenes/eliminar-imagenes.component';
import { VerArbolDosComponent } from './categorias/ver-arbol-dos/ver-arbol-dos.component';
import { AgregarHermanosComponent } from './productos/editar-producto/agregar-hermanos/agregar-hermanos.component';
import { EditarDetallesComponent } from './productos/editar-producto/editar-detalles/editar-detalles.component';
import { AgregarVideosCmmfComponent } from './productos/editar-producto/agregar-videos-cmmf/agregar-videos-cmmf.component';
import { BusquedaProductosComponent } from './productos/busqueda-productos/busqueda-productos.component';
import { CrearPedidoComponent } from './productos/crear-pedido/crear-pedido.component';
import { CrearComboComponent } from './productos/crear-combo/crear-combo.component';
import { EditarCaracteristicasComponent } from './productos/editar-producto/editar-caracteristicas/editar-caracteristicas.component';
import { EditarCompraComponent } from './compras/editar-compra/editar-compra.component';
import { HistoricoComprasComponent } from './compras/historico-compras/historico-compras.component';
import { HistoricoProductoComponent } from './productos/historico-producto/historico-producto.component';
import { ListaOrdenadaComponent } from './productos/lista-ordenada/lista-ordenada.component';
import { CrearProductoSencilloComponent } from './productos/crear-producto-sencillo/crear-producto-sencillo.component';
import { CompartirRepuestosAccesoriosComponent } from './productos/editar-producto/compartir-repuestos-accesorios/compartir-repuestos-accesorios.component';
import { VerArbolTresComponent } from './categorias/ver-arbol-tres/ver-arbol-tres.component';
import { PorMarcaCategoriaComponent } from './productos/por-marca-categoria/por-marca-categoria.component';
import { CategoriaFormComponent } from './productos/por-marca-categoria/categoria-form/categoria-form.component';

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
    EditarMarcaComponent,
    ProductoComponent,
    EditarProductoComponent,
    ProveedoresComponent,
    CrearProveedorComponent,
    ComprasComponent,
    CrearCompraComponent,
    CrearDesdeComponent,
    AgregarImagenesComponent,
    AgregarDescripcionComponent,
    CompraComponent,
    VentasComponent,
    CrearVentaComponent,
    UsuariosComponent,
    CrearUsuarioComponent,
    UsuarioComponent,
    VentaComponent,
    MarcaComponent,
    CategoriaComponent,
    EliminarImagenesComponent,
    VerArbolDosComponent,
    AgregarHermanosComponent,
    EditarDetallesComponent,
    AgregarVideosCmmfComponent,
    BusquedaProductosComponent,
    CrearPedidoComponent,
    CrearComboComponent,
    EditarCaracteristicasComponent,
    EditarCompraComponent,
    HistoricoComprasComponent,
    HistoricoProductoComponent,
    ListaOrdenadaComponent,
    CrearProductoSencilloComponent,
    CompartirRepuestosAccesoriosComponent,
    VerArbolTresComponent,
    PorMarcaCategoriaComponent,
    CategoriaFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    NgbModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    CategoriaFormComponent
  ]
})
export class AppModule { }
