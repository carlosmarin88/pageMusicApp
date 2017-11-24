import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { ArtistService } from '../services/artist.service';
import { UploadService } from '../services/upload.service';
import { Artist } from '../models/artist';

@Component({
    /*etiqueta en la cual se carga */
    selector: 'artist-edit',
    templateUrl: '../views/artist-add.html',
    providers: [UserService, ArtistService, UploadService]
})

export class ArtistEditComponent implements OnInit {

    public titulo;
    public artist: Artist;
    public identity;
    public token;
    public url: string;
    public alertMessage;
    public is_edit;
    public id_artist;
    public filesToUpload: Array<File>;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService,
        private _upLoadService: UploadService
    ) {
        this.titulo = 'Editar arista';
        this.is_edit = true;
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.artist = new Artist('', '', '');

    }

    public ngOnInit() {
        console.log('cargando artist-edit.component.ts ...');
        //llamar el metodo del api para sacar un artista en base su id getArtist
        this.getIdArtist();
        this.getArtist();
    }

    public getIdArtist() {
        this._route.params.forEach((params: Params) => {
            this.id_artist = params['id'];
        });
    }

    public getArtist() {
        this._artistService.getArtist(this.token, this.id_artist).subscribe(
            response => {

                if (!response.artist) {
                    this._router.navigate(['/']);
                } else {
                    this.artist = response.artist;
                }
            },
            error => {
                let errorMenssage = <any>error;

                if (errorMenssage != null) {
                    let body = JSON.parse(error._body);
                    console.log(error);
                }
            }
        );
    }

    public onSubmit() {
        console.log(this.artist);
        this._artistService.editArtist(this.token, this.id_artist, this.artist).subscribe(
            response => {
                if (!response.artist) {
                    this.alertMessage = 'Error en el servidor';
                } else {
                    this.alertMessage = 'El artista se ha actualizado correctamente!';

                    if(!this.filesToUpload){
                        this._router.navigate(['/artista', response.artist._id]);
                        return;
                    }

                    //Subir la imagen del artista
                    this._upLoadService.makeFileRequest(this.url + 'upload-image-artist/' + this.id_artist,
                        [], this.filesToUpload, this.token, 'image')
                        .then(
                            result=>{
                                this._router.navigate(['/artista'],response.artist._id);
                            },
                            error=>{
                                console.log(error);
                            }
                        );
                }
            },
            error => {
                let errorMenssage = <any>error;

                if (errorMenssage != null) {
                    let body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                }
            }
        );
    }


    public fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
    }
}