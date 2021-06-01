import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, Validators } from '@angular/forms';
import { ProfileService } from 'src/app/services/profile/profile.service';
import { AuthService } from 'src/app/services/Auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { appConstants } from '../../constants/app.constants';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginFormgroup: FormGroup;
  public appConstants = appConstants;

  constructor(private _profile: ProfileService, private _auth: AuthService,
    private _router: Router, private _toastr: ToastrService
  ) { }

  ngOnInit(): void {

    this.loginFormgroup = new FormGroup({
      'loginInfo': new FormGroup({
        'username': new FormControl(null, Validators.required),
        'password': new FormControl(null, Validators.required)
      }),
    });
  }

  logIn() {
    this.loginFormgroup.markAllAsTouched();
    if (this.loginFormgroup.valid) {
      this._profile.loginUser(this.loginFormgroup?.value?.loginInfo?.username,
        this.loginFormgroup?.value?.loginInfo?.password);
      this._auth.user.next(true);
      this._router.navigate(['/home']);
    } else {
      this._toastr.error(appConstants.login_form_error);
    }

  }

}
