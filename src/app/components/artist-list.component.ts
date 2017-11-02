import { Artist } from './../models/artist';
import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
//importamos los elementos del router para trabajar redireccionar 
// y recojer parametros de la url
import {Router,ActivatedRoute, Params} from '@angular/router';

@Component({
    /*selector donde se cargaria el componente */
    selector : 'artist-list',
    templateUrl: '../views/artist-list.html',
    providers:[UserService]
})

export class ArtistListComponent implements OnInit {
    public titulo : string;
    public artist : Artist[];
    public identity;
    public token;
    public url : string;

    constructor(
        private _route: ActivatedRoute,
        private _router : Router,
        private _userService : UserService
    ) {
        this.titulo = 'Artistas';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    public ngOnInit(){
        console.log('artist-list.component.ts cargado');
        //conseguir el listado de artistas

    }
}