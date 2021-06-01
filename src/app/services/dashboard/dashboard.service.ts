import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthService } from '../Auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  url: string = environment.apiUrl;

  constructor(private _http: HttpClient, private auth: AuthService) { }

  getStatesCurrentStatus() {
    return this._http.get(this.url + 'states');
  }

  getYesterdayStatus() {
    return this._http.get(this.url + 'all?yesterday');
  }



  getLast30DaysHistory(countryName) {
    return this._http.get(this.url + 'historical/' + countryName + '?lastdays=30');
  }

}
