import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'services/Auth/auth.service';
import { appConstants } from 'constants/app.constants';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public isAuthenticated: boolean = false;
  public appConstants = appConstants;


  constructor(private readonly _activatedRoute: ActivatedRoute,
    private readonly _router: Router,
    private _auth: AuthService) { }
  ngOnInit(): void {
    this._auth.user.subscribe((value) => {
      this.isAuthenticated = value;
      console.log("is authenticated::", this.isAuthenticated);

    }
    );
  }


  logOut() {
    this._auth.logOut();
  }

}
