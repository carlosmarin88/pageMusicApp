import { User } from './../models/user';
import { UserService } from './../services/user.service';
import { Component, OnInit } from '@angular/core';
import {GLOBAL} from '../services/global';
@Component({
    selector: 'user-edit',
    templateUrl: '../views/user-edit.html',
    providers: [UserService]
})
export class UserEditComponent implements OnInit {

    public titulo: String;
    public user: User;
    public identity;
    public token;
    public alertMessage;
    public filesToUpload: Array<File>;
    public url : string;

    constructor(
        private _userService: UserService
    ) {
        this.titulo = 'Actualizar mis datos';
        //localStorage
        this.identity = this._userService.getIdentity();
        this.token = this._userService.getToken();
        this.user = this.identity;
        this.url = GLOBAL.url;
    }

    public ngOnInit() {
        console.log('user-edit.component.ts cargado');
    }

    public onSubmit() {
        // console.log('usuario Modificado', this.user);
        this._userService.updateUser(this.user).subscribe(
            response => {
                if (!response.user) {
                    this.alertMessage = 'El usuario no se actualizado';
                } else {
                    // this.user = response.user;
                    /* abria que ver para usar el output para actualizar otro componente */
                    localStorage.setItem('identity', JSON.stringify(this.user));
                    document.querySelector('#identity_name').innerHTML = this.user.name + ' ' + this.user.surname;

                    if(!this.filesToUpload){
                        //Redireccion
                    }else{
                        this.makeFileRequest(this.url + 'upload-image-user/'+ this.user._id,
                        [], this.filesToUpload)
                        .then((result: any)=>{
                            /*recojo la peticion ajax hecha */
                            this.user.image = result.image;
                            localStorage.setItem('identity', JSON.stringify(this.user));
                            let image_path = this.url + 'get-image-user/' + this.user.image;
                            console.log('ruta de imagen', image_path);
                            document.querySelector('#image-logged').setAttribute('src',image_path);
        
                         //   console.log('usuario con imagen',this.user);
                        });
                    }
                    this.alertMessage = 'Datos actualizado correctamente';
                }

            },
            error => {
                let errorMessage = <any>error;
                if (errorMessage != null) {
                    let body = JSON.parse(error._body);
                    this.alertMessage = body.message;
                    console.log(error);
                }
            }
        );
    }

    public fileChangeEvent(fileInput: any) {
        this.filesToUpload = <Array<File>>fileInput.target.files;
      //  console.log(this.filesToUpload);
    }

    public makeFileRequest(url: string, params: Array<String>, files: Array<File>) {
        let token = this.token;
        /**
         * ver cambios hecho esto para ecma6 - ajax
         */
        return new Promise((resolve, reject) => {
            let formData: any = new FormData();
            let xhr = new XMLHttpRequest();

            for (let i = 0; i < files.length; i++) {
                /*va agregar al formulario  
                    el elemento name image con cada uno de los ficheros
                */
                formData.append('image', files[i], files[i].name);
            }
            /* si esta listo para realizar la peticion */
            xhr.onreadystatechange = () => {
                /* comprobamos el estado */
                if (xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        resolve(JSON.parse(xhr.response));
                    } else {
                        reject(xhr.response);
                    }
                }
            }
            xhr.open('POST', url, true);
            xhr.setRequestHeader('Authorization', token);
            xhr.send(formData);
        });
    }
}