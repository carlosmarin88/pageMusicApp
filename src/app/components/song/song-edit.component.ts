import { UploadService } from './../../services/upload.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { SongService } from '../../services/song/song.service';
import { Song } from '../../models/song';

@Component({
    selector: 'song-edit',
    templateUrl: '../../views/song/song-add.html',
    providers: [UserService, SongService, UploadService]
})
export class SongEditComponent implements OnInit {

    public titulo: string;
    public song: Song;
    public identity;
    public token: string;
    public url: string;
    public alertMessage: string;
    public is_edit: boolean;
    public fileToUpload: Array<File>;


    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _songService: SongService,
        private _uploadService: UploadService
    ) {
        this.titulo = 'Editar canción';
        this.is_edit = true;
        this.token = _userService.getToken();
        this.identity = _userService.getIdentity();
        this.url = GLOBAL.url;
        this.song = new Song(1, '', '', '', '');


    }

    public ngOnInit() {
        console.log('song-edit.component cargado');
        this.getSong();

        //sacar la cancion a editar
    }

    public getSong(){
        this._route.params.forEach((params : Params)=>{
            let id = params['id'];

            this._songService.getSong(this.token,id).subscribe(
                response=>{
                   // console.log('Response para editar', response.song);
                    if(response.song){
                        this.song = response.song;
                        console.log('tema PROMESA', this.song);

                    }else{
                     //   this._router.navigate(['/']);    
                    }
                },
                error=>{
                    let errorMessage = <any> error;

                    if(errorMessage !=null){
                        let body = JSON.parse(error._body);
                    //    this.alertMessage = body.message;
                        console.error(error);
                    }
                }
            )
        });
    }


    public onSubmit() {
        this._route.params.forEach((params: Params) => {
            let id = params['id'];

            this._songService.editSong(this.token, id, this.song).subscribe(
                response => {
                    if (!response.song) {
                        this.alertMessage = 'Error en el servidor';
                    } else {
                        this.alertMessage = "La canción se ha actualizado correctamente!";

                        if (!this.fileToUpload) {
                            console.log('Entro aca y cargo el response', response);
                            this._router.navigate(['/album',response.song.album]);
                        } else {
                            //subir el fichero de audio
                            this._uploadService.makeFileRequest(this.url + 'upload-file-song/' + id, [], this.fileToUpload, this.token, 'file')
                                .then(
                                (result) => {
                                    this._router.navigate(['/album', response.song.album._id]);
                                },
                                (error) => {
                                    console.error(error);
                                }
                                );
                        }

                        //this._router.navigate(['/']);
                    }
                },
                error => {
                    let errorMessage = <any>error;

                    if (errorMessage != null) {
                        let body = JSON.parse(error._body);
                        this.alertMessage = body.message;
                        console.error(error);
                    }
                }
            );
        });
    }

    public fileChangeEvent(fileInput: any) {
        this.fileToUpload = <Array<File>>fileInput.target.files;
    }
}