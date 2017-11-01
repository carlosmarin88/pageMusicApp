/**
 * creamos un modelo para el usuario 
 * para poder ser importado
 */
export class User{
    constructor(
        /* defino las propiedades del modelo */
        public _id : string,
        public name: string,
        public surname: string,
        public email: string,
        public password: string,
        public role:string,
        public image:string,
    ){}
}