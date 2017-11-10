import { Artist } from './../models/artist';
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
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
    /**
     * se obtiene una lista de artista
     * se pasa el token de autentificacion, page para paginar
     * @param token
     * @param page 
     */
    public getArtists(token, page) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        //ponemos unas opciones para pasar por get
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.get(this.url + 'artists/' + page, options)
            .map(res => res.json());
    }

    /**
     * se busca un artista por id
     * @param token 
     * @param id 
     */
    public getArtist(token: string, id: string) {
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });

        let options = new RequestOptions({ headers: headers });
        return this._http.get(this.url + 'artist/' + id, options)
            .map(res => res.json());
    }
    /**
     * actualizar un artista
     * @param token 
     * @param id 
     * @param artist 
     */
    public editArtist(token: string, id: string, artist: Artist) {
        let params = JSON.stringify(artist);
        let headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': token
        });
        let options = new RequestOptions({
            headers: headers
        });

        return this._http.put(this.url + '/artist/' + id, params, options)
            .map(res => res.json());

    }
    /**
     * eliminar un artita de la base
     * @param token 
     * @param id 
     */
    public deleteArtist(token: string,id : string){
        let headers = new Headers({
            'Content-Type' : 'application/json',
            'Authorization' : token
        })

        let options = new RequestOptions({headers : headers});
        return this._http.delete(this.url+'artist/'+id,options)
                    .map(res=>res.json());
    }
}
