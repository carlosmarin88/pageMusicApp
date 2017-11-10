import { HomeComponent } from './components/home.component';
/*importa funciones que tiene el router */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import user
import { UserEditComponent } from './components/user-edit.component';
//import artist
import {ArtistListComponent} from './components/artist-list.component';
import {ArtistAddComponent} from './components/artist-add.component';
import {ArtistEditComponent} from './components/artist-edit.components';
/*configuramos las rutas */
const appRoutes : Routes = [
    /* te redireciona a una url en especials 
    {
        path:'',
        redirectTo: '/artists/1',
        pathMatch : 'full'
    },*/
    /* por defecto */
    {path: '', component: HomeComponent},
    {path: 'artistas/:page', component : ArtistListComponent},
    {path:'mis-datos',component : UserEditComponent},
    {path:'crear-artista', component : ArtistAddComponent},
    {path: 'editar-artista/:id',component : ArtistEditComponent},
    /*a cualquer ruta que le pegue y no este definida */
    {path: '**', component : HomeComponent}
];

export const appRoutingProviders : any[]= [];
export const routing : ModuleWithProviders = RouterModule.forRoot(appRoutes);
