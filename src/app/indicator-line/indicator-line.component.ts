import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-indicator-line',
  templateUrl: './indicator-line.component.html',
  styleUrls: ['./indicator-line.component.css']
})
export class IndicatorLineComponent implements OnInit {
  @Input() lines: any[];

  constructor() { }

  ngOnInit() {
  }

}
