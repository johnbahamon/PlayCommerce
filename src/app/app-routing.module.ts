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

const appRoutes: Routes = [
    { path: 'marcas', component: MarcasComponent },
    { path: 'marcas/crear-marca', component: CrearMarcaComponent },
    { path: 'marcas/editar-marca/:id', component: EditarMarcaComponent },
    { path: 'categorias', component: CategoriasComponent },
    { path: 'categorias/crear-categoria', component: CrearCategoriaComponent },
    { path: 'categorias/editar-categoria/:id', component: EditarCategoriaComponent },
    { path: 'productos', component: ProductosComponent },
    { path: 'productos/crear-producto', component: CrearProductoComponent },
    { path: 'productos/crear-desde/:id', component: CrearDesdeComponent },
    { path: 'productos/editar-producto/:id', component: EditarProductoComponent },
    { path: 'productos/producto/:id', component: ProductoComponent },
    { path: 'proveedores', component: ProveedoresComponent },
    { path: 'proveedores/crear-proveedor', component: CrearProveedorComponent },
    { path: 'compras', component: ComprasComponent },
    { path: 'compras/crear-compra', component: CrearCompraComponent },
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
