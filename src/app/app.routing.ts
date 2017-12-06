import { HomeComponent } from './components/home.component';
/*importa funciones que tiene el router */
import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//import user
import { UserEditComponent } from './components/user-edit.component';
//import artist
import { ArtistListComponent } from './components/artist-list.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.components';
import { ArtistDetailComponent } from './components/artist-detail.component';
//import album
import { AlbumAddComponent } from './components/album/album-add.component';
import { AlbumEditComponent } from './components/album/album-edit.component';
import { AlbumDetailComponent } from './components/album/album-detail.component';
//import song
import { SongAddComponent } from './components/song/song-add.component';
import {SongEditComponent} from './components/song/song-edit.component';

/*configuramos las rutas */
const appRoutes: Routes = [
    /* te redireciona a una url en especials 
    {
        path:'',
        redirectTo: '/artists/1',
        pathMatch : 'full'
    },*/
    /* por defecto */
    { path: '', component: HomeComponent },
    { path: 'artistas/:page', component: ArtistListComponent },
    { path: 'mis-datos', component: UserEditComponent },
    { path: 'crear-artista', component: ArtistAddComponent },
    { path: 'editar-artista/:id', component: ArtistEditComponent },
    { path: 'artista/:id', component: ArtistDetailComponent },
    /*ruta para album */
    { path: 'crear-album/:artist', component: AlbumAddComponent },
    { path: 'editar-album/:id', component: AlbumEditComponent },
    { path: 'album/:id', component: AlbumDetailComponent },
    /* ruta para song */
    { path: 'crear-tema/:album', component: SongAddComponent },
    { path: 'editar-tema/:id', component: SongEditComponent},
    /*a cualquer ruta que le pegue y no este definida */
    { path: '**', component: HomeComponent }
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);
