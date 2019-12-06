import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  buttons: string[] = ['projects', 'logs', 'notes', 'lifestyle'];
  theTime: moment.Moment = moment();

  constructor(private router: Router) {}

  ngOnInit(): void {
    setInterval(() => this.theTime = moment(), 1000);
  }

  btnClick(b: string): void {
    this.router.navigateByUrl('/' + b);
  }
}
