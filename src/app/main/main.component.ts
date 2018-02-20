import { Component, Injectable, OnInit, ViewEncapsulation } from '@angular/core';
import { CMService } from '../cm.service';
import { Colormg } from '../colormg';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
@Injectable()
export class MainComponent implements OnInit {

  allColorsDetails: Colormg[];
  statusCode: number;

  /**
   * @type {number} limit The number of colors per page.
   */
  limit: number;

  /**
   * @type {number} page The current page.
   */
  page: number = 1;

  /**
   * @type {Colormg[]} Colormg A list of Colormg to output in a table.
   */
  colormgs: Colormg[];

  //Create constructor to get service instance
  constructor(private colorService: CMService) {
  }

  ngOnInit(): void {

    this.getAllColorsDetails();
    this.getLength() ;
  }

  //Fetch all colors
  getLength() {
  // Load colors from the colors service on init
  this.colorService.getAllColors().subscribe(
    (colormgs: Colormg[]) => {
      this.colormgs = colormgs;
      console.log("this.colormgs.length: " + this.colormgs.length);
      this.limit = this.colormgs.length; // Start off by showing all colors on a single page.
    });
  }

  //Fetch all colors
  getAllColorsDetails() {
       this.colorService.getAllColors()
     .subscribe(
               data => this.allColorsDetails = data,
               errorCode =>  this.statusCode = errorCode);
  }

}
