import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/Auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'covid-dashboard';

  constructor(private auth: AuthService){}

  ngOnInit(){
    
  }
}
