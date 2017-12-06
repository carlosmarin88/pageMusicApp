import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { Song } from '../../models/song';

@Injectable()
export class SongService {
    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public addSong(token: string, song: Song) {
        let params = JSON.stringify(song);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'song', params, { headers: headers })
            .map(res => res.json());
    }

    public getSong(token: string, id: string) {
       // console.info('contenido del token', token);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({ headers: headers });

        return this._http.get(this.url + 'song/' + id, options)
            .map(res => res.json());
    }

    public editSong(token: string, id: string, song: Song) {
        let params = JSON.stringify(song);
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization' : token
        });

        let options = new RequestOptions({headers : headers});

        return this._http.put(this.url+'song/' + id,params,options)
            .map(res=>res.json());
    }
}