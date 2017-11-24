import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { AlbumService } from '../services/album/album.service'
import { UploadService } from '../services/upload.service';
import { ArtistService } from '../services/artist.service';
import { Artist } from '../models/artist';
import { Album } from '../models/album';

@Component({
    selector: 'artist-detail',
    templateUrl: '../views/artist-detail.html',
    providers: [UserService, ArtistService, AlbumService]
})

export class ArtistDetailComponent implements OnInit {

    public titulo: string;
    public artist: Artist;
    public identity: string;
    public token: string;
    public url: string;
    public albums: Album[];
    public alertMessage: string;
    public confirmado: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService,
        private _albumService: AlbumService
    ) {
        this.titulo = 'Detalle de Artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    getArtist() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._artistService.getArtist(this.token, id).subscribe(
                response => {
                    if (!response.artist) {
                        this._router.navigate(['/']);
                    } else {
                        this.artist = response.artist;
                        //sacar los albums del artista
                        this.getAlbums(response.artist._id);
                    }
                },
                error => {
                    let errorMessage = <any>error;

                    if (errorMessage != null) {
                        let body = JSON.parse(error._body);
                        console.log(error);
                    }
                });
        });
    }

    public getAlbums(idArtist: string) {
        this._albumService.getAlbums(this.token, idArtist)
            .subscribe(
            response => {
                this.albums = response.albums;
                if (response.albums) {
                    this.albums = response.albums;
                    console.log(this.albums);
                } else {
                    this.alertMessage = 'Este artia no tiene albums';
                }
            },
            error => {
                let errorMessage = <any>error;
                if (errorMessage != null) {
                    let body = JSON.parse(error._body);
                    console.log(error);
                }
            }
            );
    }

    public ngOnInit() {
        this.getArtist();
        console.log('Cargando el artist-detail.component.ts...')
    }

    public onDeleteConfirm(id: string) {
        this.confirmado = id;
    }

    public onCancelAlbum() {
        this.confirmado = null;
    }

    public onDeleteAlbum(id: string) {
        this._albumService.deleteAlbum(this.token, id).subscribe(
            response => {
                if (!response.album) {
                    alert('Error en el servidor');
                    return;
                }
                this.getArtist();

            },
            error => {
                let errorMessage = <any>error;

                if (errorMessage != null) {
                    let body = JSON.parse(error._body);
                    this.alertMessage = body.message;

                    console.error(error);
                }
            }
        )
    }

}