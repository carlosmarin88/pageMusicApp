/**
 * creacion de servicio
 */
/*libreria para decorar*/
import {Injectable} from '@angular/core';
import {Http, Response, Headers} from '@angular/http';
/* libreria para mapear objecto y cosas */
import 'rxjs/add/operator/map';
/* recoger repuesta ajax del servidor */
import {Observable} from 'rxjs/Observable';
import { GLOBAL } from './global';


@Injectable()
export class UserService{
    
    public identity;
    public token;
    public url : string; 

    constructor(private _http: Http){
        this.url = GLOBAL.url;
    }

    public signup(user_to_login, gethash=null){
        if(gethash!=null){
            user_to_login.gethash = gethash;
        }
        let json = JSON.stringify(user_to_login);
        let params = json;
        /**
         * en el content-Type se puede pasar de diferente valores
         * ver eso despues
         */
        let headers = new Headers({'Content-Type':'application/json'});
        /* devuelvo un objeto json */
        return this._http.post(this.url+'login',params, {headers: headers}).map(res=> res.json());
    }

    public register(user_to_register){
        let params = JSON.stringify(user_to_register);
        /*tipo de contenido que envia */
        let headers = new Headers({'Content-Type':'application/json'});
        
        return this._http.post(this.url+'register',params, {headers:headers}).map(res =>{ 
            return res.json();
        });
    }

    public updateUser(user_to_update){
        let params = JSON.stringify(user_to_update);
        /*paso el token para tener permiso */
        let headers = new Headers({
                        'Content-Type':'application/json',
                        'Authorization':this.getToken()
                        });

        return this._http.put(this.url+'update-user/'+ user_to_update._id,params,{headers: headers})
                    .map(res=> res.json());
    }

    public getIdentity(){
        let identity = JSON.parse(localStorage.getItem('identity'));
        this.identity = identity !==undefined ? identity : null;
        return this.identity;
        
    }

    public getToken(){
        let token = localStorage.getItem('token');
        this.token = token!==undefined ? token : null;
        return this.token;
    }
}