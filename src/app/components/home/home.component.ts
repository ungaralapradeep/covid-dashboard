import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';
import { ToastrService } from 'ngx-toastr';
import { DashboardService } from '../../services/dashboard/dashboard.service';
import { Color, BaseChartDirective, Label } from 'ng2-charts';
import { AuthService } from 'src/app/services/Auth/auth.service';

import { appConstants } from '../../constants/app.constants';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  //  varibles 
  matritalStatus: string = '';
  editProfileFromGroup: FormGroup;
  public appConstants = appConstants;



  chartColors = {
    'cases': { // blue
      backgroundColor: 'rgba(0,0,255,0.3)',
      borderColor: 'rgba(0,0,255,0.3)',

    },
    'recovered': { // green 
      backgroundColor: 'rgba(0,255,0,0.3)',
      borderColor: 'rgba(0,255,0,0.3)',

    },
    'deaths': { // red
      backgroundColor: 'rgba(255,0,0,0.3)',
      borderColor: 'rgba(255,0,0,0.3)',

    }
  }


  // line-chart
  public lineChartData: ChartDataSets[] = [];
  public lineChartLabels: Label[];
  public lineChartColors: Color[] = [];
  public lineChartLegend = true;
  public lineChartType = 'line';
  public lineChartPlugins = [];

  // pie chart 
  public pieChartLabels: Label[] = ['Deaths', 'Recovered', 'Cases'];
  public pieChartData: number[] = [300, 500, 100];
  public pieChartType: ChartType = 'pie';
  public pieChartLegend = true;
  public pieChartColors = [
    {
      backgroundColor: ['rgba(255,0,0,0.3)', 'rgba(0,255,0,0.3)', 'rgba(0,0,255,0.3)'],
    },
  ];



  // ag-grid 
  columnDefs = [
    { field: 'state', sortable: true, filter: true },
    { field: 'cases', sortable: true, filter: true },
    { field: 'active', sortable: true, filter: true },
    { field: 'recovered', sortable: true, filter: true },
    { field: 'deaths', sortable: true, filter: true },
    { field: 'testsPerOneMillion', sortable: true, filter: true },
    { field: 'testsPerOneMillion', sortable: true, filter: true },
    { field: 'deathsPerOneMillion', sortable: true, filter: true }
  ];
  rowData = [];


  // Methods start 
  getStatesCurrentStatus() {
    this._dashboradservice.getStatesCurrentStatus().subscribe(
      (response: any) => {
        this.rowData = response;
      }, (err: any) => {
      });

  }
  getYesterdayStatus() {
    this._dashboradservice.getYesterdayStatus().subscribe(
      (response: any) => {
        this.pieChartData = [response.deaths, response.recovered, response.cases]

      }, (err: any) => {
      });

  }

  getHistory() {
    this._dashboradservice.getLast30DaysHistory('india').subscribe(
      (response: any) => {

        let keys = Object.keys(response.timeline);

        this.lineChartData.pop();
        for (let key of keys) {
          let values = Object.values(response.timeline[key]);
          this.lineChartData.push({
            'data': values, 'label': key, ...this.chartColors[key]
          });

        }

        this.lineChartLabels = Object.keys(response.timeline['cases']);

      }, (err: any) => {
        console.log('getLast30DaysHistory errro', err);
      });

  }

  updateDetails() {
    this.editProfileFromGroup.markAllAsTouched();
    if (this.editProfileFromGroup.valid) {
      this.auth.loginDetails.username = this.editProfileFromGroup.value.Username
      document.getElementById('editProfile').click();
      this._toastr.success(appConstants.update_success);

    } else {
      this._toastr.error(appConstants.all_required_error);
    }
  }



  constructor(private _dashboradservice: DashboardService,
    private _formBuilder: FormBuilder,
    private _toastr: ToastrService,
    public auth: AuthService) {


  }

  ngOnInit(): void {
    this.getStatesCurrentStatus();
    this.getYesterdayStatus();
    this.getHistory();

    this.editProfileFromGroup = this._formBuilder.group({
      Username: [, [Validators.required]],
      LastName: [],
      MaritalStatus: ['', [Validators.required]],
      FatherName: [],
      SpouseName: []
    })


    this.editProfileFromGroup.patchValue({
      Username: this.auth.loginDetails.username
    })

    // dynamic validations 
    this.editProfileFromGroup.get('MaritalStatus').valueChanges.subscribe(value => {
      this.matritalStatus = value;
      if (value == 'Married') {
        this.editProfileFromGroup.get('SpouseName').setValidators(Validators.required);
      }
      if (value == 'Single') {
        this.editProfileFromGroup.get('SpouseName').clearValidators();
      } else {
        return;
      }
    });

  }

}
