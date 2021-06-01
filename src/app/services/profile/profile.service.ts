import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { tap, map } from 'rxjs/operators';
import { AuthService } from '../Auth/auth.service';
import { User } from 'src/app/models/user.model';
import { stringify } from '@angular/compiler/src/util';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url: string = environment.apiUrl;

  constructor(private _http: HttpClient, private _auth: AuthService) { }

  loginUser(username: string, password: string) {
    console.log(username, password)
    localStorage.setItem('loginUserName', username);
    this._auth.loginDetails = { 'username': username, 'password': password };
    // this._auth.user.next(true);
  }
}
