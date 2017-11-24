import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AlbumService } from '../../services/album/album.service';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Album } from '../../models/album';
import { Artist } from '../../models/artist';
import { UploadService } from '../../services/upload.service';

@Component({
    selector: 'album-edit',
    templateUrl: '../../views/album/album-add.html',
    providers: [UserService, AlbumService, UploadService]
})

export class AlbumEditComponent implements OnInit {

    public titulo: string;
    public identity: string;
    public album: Album;
    public token: string;
    public url: string;
    public alertMessage: string;
    public is_edit: boolean;
    public fileToUpload : Array<File>;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _albumService: AlbumService,
        private _upLoadService : UploadService
    ) {
        this.titulo = "Editar album";
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.album = new Album('', '', 2017, '', '');
        this.is_edit = true;
    }

    public ngOnInit() {
        console.log("cargando album-edit.component ...");
        //conseguir el album
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
                    }
                },
                error => {
                    let errorMessage = <any>error;
                    if (errorMessage != null) {
                        let body = JSON.parse(error._body);
                        this.alertMessage = body.message;

                        console.log(error);
                    }
                }

            );
        });
    }

    public onSubmit() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._albumService.editAlbum(this.token, id, this.album).subscribe(
                response => {
                    if (!response.album) {
                        this.alertMessage = "Error en el servidor";
                    } else {
                        this.alertMessage = "El album se ha edactualizado correctamente!s";
                        //sibir la imagen
                        if(!this.fileToUpload){
                            //rediregir
                            this._router.navigate(['/artista', response.album.artist]);
                            return;
                        }

                        this._upLoadService.makeFileRequest(this.url+'upload-image-album/'+id,[],
                        this.fileToUpload,this.token,'image').then(
                            result=>{
                                this._router.navigate(['/artista',response.album.artist]);
                            },
                            error =>{
                                console.log(error);
                            }
                        )
                    }
                },
                error => {
                    let errorMessage = <any>error;
                    if (errorMessage != null) {
                        let body = JSON.parse(error._body);
                        this.alertMessage = body.message;
                        console.log(error);
                    }
                }
            );
        });
    }

    public fileChangeEvent(fileInput : any){
        this.fileToUpload = <Array<File>>fileInput.target.files;
    }
}