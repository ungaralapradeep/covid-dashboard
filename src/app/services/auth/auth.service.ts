import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject(null);
  loginDetails;

  constructor(private router: Router) { }

  logOut() {
    this.user.next(null);
    this.router.navigate(['']);
  }


}
