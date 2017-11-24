import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../../services/global';
import {UserService} from '../../services/user.service';
import {AlbumService} from '../../services/album/album.service';
import {Album} from '../../models/album';

@Component({
    selector : 'album-detail',
    templateUrl : '../../views/album/album-detail.html',
    providers : [UserService,AlbumService]
})

export class AlbumDetailComponent implements OnInit{

    public token : string;
    public identity : string;
    public album : Album;
    public url : string;
    public alertMessage : string;

    constructor(
        private _route : ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _albumService : AlbumService
    ){
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
    }

    public ngOnInit(){
        console.log('cargando AlbumDetailComponent.component.ts ...');
        //sacar album de la bbdd
        this.getAlbum();
    }

    public getAlbum(){
        this._route.params.forEach((params : Params)=>{
            let id = params['id'];

            this._albumService.getAlbum(this.token,id).subscribe(
                response=>{
                    if(!response.album){
                       this._router.navigate(['/']);
                    }else{
                        this.album = response.album;
                        console.log(this.album);
                    }
                },
                error=>{
                    let errorMessage = <any>error;
                    if(errorMessage){
                        let body = JSON.parse(error._body);
                        this.alertMessage=body.message;
                        console.log(errorMessage);
                    }
                }
            );
        });
    }
}