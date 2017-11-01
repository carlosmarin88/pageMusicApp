/*importa funciones que tiene el router */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import user
import { UserEditComponent } from './components/user-edit.component';

/*configuramos las rutas */
const appRoutes : Routes = [
    /* por defecto */
    {path: '', component: UserEditComponent},
    {path:'mis-datos',component : UserEditComponent},
    /*a cualquer ruta que le pegue y no este definida */
    {path: '**', component : UserEditComponent}
];

export const appRoutingProviders : any[]= [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
