import { GLOBAL } from './services/global';
import { UserService } from './services/user.service';
import { User } from './models/user';
import { Component, OnInit } from '@angular/core';

import {Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  /* con esta propiedad lo que hace es injectar el servicio */
  providers: [UserService]
})
export class AppComponent implements OnInit {
  title = 'MUSIFY';
  public user: User;
  /*toda la info del usuario logeado
    lo va a guardar en localStorage
  */
  public userRegister: User;
  public identity;
  /*tambien se guarda en localStorage */
  public token;
  /*creo una propiedad para mostrar el mensaje y bindear a la vista
    two-way data binding
  */
  public errorMessage;

  public alertRegister;

  public url : string;

  constructor(
    private _userService: UserService,
    private _router : Router,
    private _route : ActivatedRoute
  ) {
    this.user = new User('', '', '', '', '', 'ROL_USER', '');
    this.userRegister = new User('', '', '', '', '', 'ROL_USER', '');
    this.url = GLOBAL.url;
  }
  /* al cargar el componente ejecuta este metodo */
  ngOnInit() {
    //cuando carge el componente
    this.identity = this._userService.getIdentity();
    this.token = this._userService.getToken();
    console.log('usuario', this.identity);
    console.log('token', this.token);
  }

  public onSubmit() {
    console.log(this.user);
    //Conseguir los datos del usuario identificado
    this._userService.signup(this.user).subscribe(
      response => {
        console.log(response);
        let identity = response.user;
        this.identity = identity;
        if (!this.identity._id) {
          alert('El usuario no está correctamente identificado');
        } else {
          //crear elemento en el localStorage para tener el usuario disponible
          localStorage.setItem('identity', JSON.stringify(identity));
          //conseguir el token para enviarselo a cada peticion http
          this._userService.signup(this.user, 'true').subscribe(
            response => {
              console.log(response);
              let token = response.token;
              this.token = token;
              if (token.length <= 0) {
                alert('El token no se generado correctamente');
              } else {
                //crear elemento en el localStorage para tener el token disponible
                localStorage.setItem('token', token);
                /*blanqueo los campo despues del login */
                this.user = new User('', '','','','','ROLE_USER','');
                
              }
              
            },
            error => {
              /* buscar que es any */
              let errorMessage = <any>error;
              if (errorMessage != null) {
                let body = JSON.parse(error._body);
                this.errorMessage = body.message;
                console.log(errorMessage);
              }
            }
          );

        }
      },
      error => {
        /* buscar que es any */
        let errorMessage = <any>error;
        if (errorMessage != null) {
          let body = JSON.parse(error._body);
          this.errorMessage = body.message;
          console.log(errorMessage);
        }
      }
    );
  }

  logout() {
    /* para remover por elemento */
    localStorage.removeItem('identity');
    localStorage.removeItem('token');
    /* remuevo todo lo de localstore */
    localStorage.clear();
    this.identity = null;
    this.token = null;
    this._router.navigate(['/']);
  }


  public onSubmitRegister() {
    console.log(this.userRegister);
    /*tiene dos funciones callback uno por resp y err */
    this._userService.register(this.userRegister).subscribe(
      response => {
        let user = response.user;
        this.userRegister = user;
      
        if (!user._id) {
          this.alertRegister = "Error al registrarse";
        }else{
          this.alertRegister = "El registro se realizado correctamente, identificate con " + this.userRegister.email;
          this.userRegister = new User('', '','','','','ROLE_USER','');
        }
      },
      error => {
        let errorMessage = <any>error;
        if (errorMessage != null) {
          let body = JSON.parse(error._body);
          this.alertRegister = body.message;

          console.log(error);
        }
      }
    );
  }

}
