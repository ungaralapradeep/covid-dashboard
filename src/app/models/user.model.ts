export class User{
    constructor(public name: string,public email: string, public token: string){}

    getToken(){
        if(this.token){
            const expiry = (JSON.parse(atob(this.token.split('.')[1]))).exp;
            return (Math.floor((new Date).getTime() / 1000)) >= expiry;
        }
        return null;
    }

}