import { Artist } from './../models/artist';
import { GLOBAL } from './../services/global';
import { UserService } from './../services/user.service';
import { ArtistService } from './../services/artist.service';
import { Component, OnInit } from '@angular/core';

//importamos los elementos del router para trabajar redireccionar 
// y recojer parametros de la url
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    /*selector donde se cargaria el componente */
    selector: 'artist-list',
    templateUrl: '../views/artist-list.html',
    providers: [UserService, ArtistService]
})

export class ArtistListComponent implements OnInit {
    public titulo: string;
    public artists: Artist[];
    public identity;
    public token;
    public url: string;
    public next_page;
    public prev_page;
    public confirmado;

    constructor(
        private _route: ActivatedRoute,
        private _router: Router,
        private _userService: UserService,
        private _artistService: ArtistService
    ) {
        this.titulo = 'Artistas';
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.url = GLOBAL.url;
        this.next_page = 1;
        this.prev_page = 1;
    }

    public ngOnInit() {
        console.log('artist-list.component.ts cargado');
        //conseguir el listado de artistas
        this.getArtists();
    }

    public getArtists() {
        this._route.params.forEach((params: Params) => {
            let page = +params['page'];
            if (!page) {
                page = 1;
            } else {
                this.next_page = page + 1;
                this.prev_page = page - 1;

                if (this.prev_page == 0) {
                    this.prev_page = 1;
                }
            }

            this._artistService.getArtists(this.token, page).subscribe(
                response => {
                    if (!response.artists) {
                        this._router.navigate(['/']);
                    } else {
                        this.artists = response.artists;
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

        });
    }

    public onDeleteConfirm(id: string) {
        this.confirmado = id;
    }

    public onCancelArtist() {
        this.confirmado = null;
    }

    public onDeleteArtist(id: string) {
        this._artistService.deleteArtist(this.token, id).subscribe(
            response => {
                if (!response.artist) {
                    alert("Error en el servidor");
                } else {
                 this.getArtists();   
                }
            },
            error => {
                let errorMessage = <any>error;

                if (errorMessage != null) {
                    let body = JSON.parse(error._body);
                    console.log(error);
                    console.log(body);
                }
            }
        );
    }
}