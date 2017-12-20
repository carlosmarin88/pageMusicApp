import { SongService } from './../../services/song/song.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { AlbumService } from '../../services/album/album.service';
import { Album } from '../../models/album';
import { Song } from '../../models/song';

@Component({
    selector: 'album-detail',
    templateUrl: '../../views/album/album-detail.html',
    providers: [UserService, AlbumService, SongService]
})

export class AlbumDetailComponent implements OnInit {

    public token: string;
    public identity: string;
    public album: Album;
    public url: string;
    public alertMessage: string;
    public songs: Song[];
    public confirmado: string;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService,
        private _songService: SongService
    ) {
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
    }

    public ngOnInit() {
        console.log('cargando AlbumDetailComponent.component.ts ...');
        //sacar album de la bbdd
        this.getAlbum();
    }

    public getAlbum() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._albumService.getAlbum(this.token, id).subscribe(
                response => {
                    if (!response.album) {
                        this._router.navigate(['/']);
                    } else {
                        this.album = response.album;
                        //sacar las canciones 
                        this._songService.getSongs(this.token, response.album._id)
                            .subscribe(
                            response => {
                                console.info('Responde de canciones', response);
                                if (!response.songs) {
                                    this.alertMessage = "Este album no tiene canciones";
                                } else {
                                    this.songs = response.songs;
                                }
                            },
                            error => {

                            }
                            );
                    }
                },
                error => {
                    let errorMessage = <any>error;
                    if (errorMessage) {
                        let body = JSON.parse(error._body);
                        this.alertMessage = body.message;
                        console.log(errorMessage);
                    }
                }
            );
        });
    }

    public onDeleteConfirm(id: string) {
        this.confirmado = id;
    }

    public onCancelSong() {
        this.confirmado = null;
    }

    public onDeteleSong(id: string) {
        console.info('Eliminar', id);
        this._songService.deleteSong(this.token, id).subscribe(
            response => {
                if(!response.song){
                    alert('Error en el servidor');
                }
                this.getAlbum();
            },
            error => {
                let errorMessage = <any>error;
                if (errorMessage != null) {
                    let body = JSON.parse(error._body);
                    console.error(error);
                }
            }
        );
    }
}