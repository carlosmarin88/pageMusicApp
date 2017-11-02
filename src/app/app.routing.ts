/*importa funciones que tiene el router */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//import user
import { UserEditComponent } from './components/user-edit.component';
//import artist
import {ArtistListComponent} from './components/artist-list.component';
/*configuramos las rutas */
const appRoutes : Routes = [
    /* te redireciona a una url en especials */
    {
        path:'',
        redirectTo: '/artists/1',
        pathMatch : 'full'
    },
    /* por defecto */
    {path: '', component: ArtistListComponent},
    {path: 'artists/:page', component : ArtistListComponent},
    {path:'mis-datos',component : UserEditComponent},
    /*a cualquer ruta que le pegue y no este definida */
    {path: '**', component : ArtistListComponent}
];

export const appRoutingProviders : any[]= [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
