import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { GLOBAL } from '../../services/global';
import { UserService } from '../../services/user.service';
import { Song } from '../../models/song';

@Component({
    selector: 'song-add',
    templateUrl: '../../views/song/song-add.html',
    providers: [UserService]
})
export class SongAddComponent implements OnInit {

    public token: string;
    public identity: string;
    public url: string;
    public titulo: string;
    public alertMessage: string;
    public song: Song;

    constructor(
        private _userService: UserService,
        private _route: ActivatedRoute,
        private _router: Router
    ) {
        this.titulo = 'Crear nueva canción';
        this.url = GLOBAL.url;
        this.token = this._userService.getToken();
        this.identity = this._userService.getIdentity();
        this.song = new Song(1, '', '', '', '');
    }

    public ngOnInit() {
        console.log('cargando SongAddComponent.component.ts ...');
    }

    public onSubmit() {

        this._route.params.forEach((params: Params) => {
            let album_id = params['album'];
            this.song.album = album_id;

        });

        console.log('cancion', this.song);

    }
}