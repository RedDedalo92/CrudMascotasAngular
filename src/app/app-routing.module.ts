import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

//Componentes
import { ListadoMascotaComponent } from './components/listado-mascota/listado-mascota.component';
import { AgregarEditarMascotaComponent } from './components/agregar-editar-mascota/agregar-editar-mascota.component';
import { VerMascotaComponent } from './components/ver-mascota/ver-mascota.component';

const routes: Routes = [
  { path:'', redirectTo: 'listado-mascotas', pathMatch:'full'},
  { path:'listado-mascotas', component: ListadoMascotaComponent},
  { path:'agregar-mascota', component: AgregarEditarMascotaComponent},
  { path:'ver-mascota/:id', component: VerMascotaComponent},
  { path:'editar-mascota/:id', component: AgregarEditarMascotaComponent},
  { path:'**', redirectTo: 'listado-mascotas', pathMatch:'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
