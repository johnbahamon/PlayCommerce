import { CrearPedidoComponent } from './productos/crear-pedido/crear-pedido.component';
import { BusquedaProductosComponent } from './productos/busqueda-productos/busqueda-productos.component';
import { AgregarVideosCmmfComponent } from './productos/editar-producto/agregar-videos-cmmf/agregar-videos-cmmf.component';
import { EditarDetallesComponent } from './productos/editar-producto/editar-detalles/editar-detalles.component';
import { VerArbolDosComponent } from './categorias/ver-arbol-dos/ver-arbol-dos.component';
import { EliminarImagenesComponent } from './productos/editar-producto/eliminar-imagenes/eliminar-imagenes.component';
import { CategoriaComponent } from './categorias/categoria/categoria.component';
import { ComprasComponent } from './compras/compras.component';
import { EditarMarcaComponent } from './marcas/editar-marca/editar-marca.component';
import { EditarCategoriaComponent } from './categorias/editar-categoria/editar-categoria.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MarcasComponent } from './marcas/marcas.component';
import { CrearMarcaComponent } from './marcas/crear-marca/crear-marca.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { CrearCategoriaComponent } from './categorias/crear-categoria/crear-categoria.component';
import { ProductosComponent } from './productos/productos.component';
import { CrearProductoComponent } from './productos/crear-producto/crear-producto.component';
import { ProductoComponent } from './productos/producto/producto.component';
import { EditarProductoComponent } from './productos/editar-producto/editar-producto.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { CrearProveedorComponent } from './proveedores/crear-proveedor/crear-proveedor.component';
import { CrearCompraComponent } from './compras/crear-compra/crear-compra.component';
import { CrearDesdeComponent } from './productos/crear-desde/crear-desde.component';
import { AgregarImagenesComponent } from './productos/editar-producto/agregar-imagenes/agregar-imagenes.component';
import { AgregarDescripcionComponent } from './productos/editar-producto/agregar-descripcion/agregar-descripcion.component';
import { CompraComponent } from './compras/compra/compra.component';
import { VentasComponent } from './ventas/ventas.component';
import { CrearVentaComponent } from './ventas/crear-venta/crear-venta.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { CrearUsuarioComponent } from './usuarios/crear-usuario/crear-usuario.component';
import { VentaComponent } from './ventas/venta/venta.component';
import { MarcaComponent } from './marcas/marca/marca.component';
import { AgregarHermanosComponent } from './productos/editar-producto/agregar-hermanos/agregar-hermanos.component';

const appRoutes: Routes = [
    { path: 'marcas', component: MarcasComponent },
    { path: 'marcas/marca/:id', component: MarcaComponent },
    { path: 'marcas/crear-marca', component: CrearMarcaComponent },
    { path: 'marcas/editar-marca/:id', component: EditarMarcaComponent },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'categorias/ver-arbol-2', component: VerArbolDosComponent },
    { path: 'categorias/categoria/:id', component: CategoriaComponent },
    { path: 'categorias/crear-categoria', component: CrearCategoriaComponent },
    { path: 'categorias/editar-categoria/:id', component: EditarCategoriaComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'productos/busqueda-productos', component: BusquedaProductosComponent },
    { path: 'productos/crear-pedido', component: CrearPedidoComponent },
    { path: 'productos/crear-producto', component: CrearProductoComponent },
    { path: 'productos/crear-desde/:id', component: CrearDesdeComponent },
    { path: 'productos/editar-producto/:id', component: EditarProductoComponent },
    { path: 'productos/editar-producto/agregar-imagenes/:id', component: AgregarImagenesComponent },
    { path: 'productos/editar-producto/eliminar-imagenes/:id', component: EliminarImagenesComponent },
    { path: 'productos/editar-producto/agregar-descripcion/:id', component: AgregarDescripcionComponent },
    { path: 'productos/editar-producto/agregar-hermanos/:id', component: AgregarHermanosComponent },
    { path: 'productos/editar-producto/editar-detalles/:id', component: EditarDetallesComponent },
    { path: 'productos/editar-producto/agregar-videos-cmmf/:id', component: AgregarVideosCmmfComponent },
    { path: 'productos/producto/:id', component: ProductoComponent },
    { path: 'proveedores', component: ProveedoresComponent },
    { path: 'proveedores/crear-proveedor', component: CrearProveedorComponent },
    { path: 'compras', component: ComprasComponent },
    { path: 'compras/crear-compra', component: CrearCompraComponent },
    { path: 'compras/compra/:id', component: CompraComponent },
    { path: 'ventas', component: VentasComponent },
    { path: 'ventas/crear-venta', component: CrearVentaComponent },
    { path: 'ventas/venta/:id', component: VentaComponent },
    { path: 'usuarios', component: UsuariosComponent },
    { path: 'usuarios/crear-usuario', component: CrearUsuarioComponent },
    { path: '',   redirectTo: '/productos', pathMatch: 'full' },
//   { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}
