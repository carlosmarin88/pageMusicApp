import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {GLOBAL} from '../services/global';
import {UserService} from '../services/user.service';
import {UploadService} from '../services/upload.service';
import {ArtistService} from '../services/artist.service';
import {Artist} from '../models/artist';

@Component({
    selector: 'artist-detail',
    templateUrl: '../views/artist-detail.html',
    providers: [UserService,ArtistService]
})

export class ArtistDetailComponent implements OnInit{

    public titulo: string;
    public artist: Artist;
    public identity;
    public token;
    public url : string;
    public alertMessage;
 
    constructor(
        private _route : ActivatedRoute,
        private _router : Router,
        private _userService : UserService,
        private _artistService : ArtistService
    ){
        this.titulo = 'Detalle de Artista';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
    }

    getArtist(){
        this._route.params.forEach((params : Params)=>{
            let id = params['id'];

            this._artistService.getArtist(this.token,id).subscribe(
                response=>{
                    if(!response.artist){
                        this._router.navigate(['/']);
                    }else{
                        this.artist = response.artist;
                        //sacar los albums del artista
                    }
                },
                error=>{
                    let errorMessage = <any>error;

                    if(errorMessage !=null){
                        let body = JSON.parse(error._body);
                        console.log(error);
                    }
                });
        });
    }

    public ngOnInit(){
        this.getArtist();
        console.log('Cargando el artist-detail.component.ts...')
    }


}