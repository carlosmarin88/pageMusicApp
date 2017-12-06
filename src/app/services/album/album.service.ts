import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { GLOBAL } from '../global';
import { Album } from './../../models/album';

@Injectable()
export class AlbumService {

    public url: string;

    constructor(private _http: Http) {
        this.url = GLOBAL.url;
    }

    public addAlbum(token: string, album: Album) {
        let params = JSON.stringify(album);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        return this._http.post(this.url + 'album', params, { headers: headers })
            .map(res => res.json());

    }

    public getAlbum(token, id: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({ headers: headers });

        return this._http.get(this.url + 'album/' + id, options)
            .map(res => res.json());
    }

    public editAlbum(token: string, id: string, album: Album) {
        let params = JSON.stringify(album);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        return this._http.put(this.url + 'album/' + id, params, { headers: headers })
            .map(res => {
                console.log(res.json());
                return res.json();
            });
    }

    public getAlbums(token: string, artistId = null) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({ headers: headers });
        let urlGetAlbum;
        if (artistId == null)
            urlGetAlbum = this.url + 'albums';
        else
            urlGetAlbum = this.url + 'albums/' + artistId;

        return this._http.get(urlGetAlbum, options)
            .map(res => res.json());
    }

    public deleteAlbum(token, id: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({ headers: headers });
        return this._http.delete(this.url + 'album/' + id, options)
            .map(res => res.json());
    }
}