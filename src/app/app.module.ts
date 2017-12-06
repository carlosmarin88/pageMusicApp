import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { routing, appRoutingProviders } from './app.routing';

import { AppComponent } from './app.component';
import { UserEditComponent } from './components/user-edit.component';
import { ArtistListComponent } from './components/artist-list.component';
import { HomeComponent } from './components/home.component';
import { ArtistAddComponent } from './components/artist-add.component';
import { ArtistEditComponent } from './components/artist-edit.components';
import { ArtistDetailComponent } from './components/artist-detail.component';
/*album import */
import { AlbumAddComponent } from './components/album/album-add.component';
import { AlbumEditComponent } from './components/album/album-edit.component';
import { AlbumDetailComponent} from './components/album/album-detail.component';
/*song import */
import {SongAddComponent} from './components/song/song-add.component';
import {SongEditComponent} from './components/song/song-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    /* puedo acceder a sus directiva de cualquier otro 
    componente dentro de su plantilla */
    UserEditComponent,
    ArtistListComponent,
    HomeComponent,
    ArtistAddComponent,
    ArtistEditComponent,
    ArtistDetailComponent,
    AlbumAddComponent,
    AlbumEditComponent,
    AlbumDetailComponent,
    SongAddComponent,
    SongEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [appRoutingProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
