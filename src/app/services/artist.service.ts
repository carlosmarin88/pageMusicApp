import { Artist } from './../models/artist';
import { Injectable } from '@angular/core';
import { Http, Response, Headers } from '@angular/http';
/* libreria para mapear objecto y cosas */
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from './global';

@Injectable()
export class ArtistService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public addArtist(token, artist: Artist) {
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'artist',
            params,
            { headers: headers }).map(res => res.json());

    }
}
