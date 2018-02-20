import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CMService } from '../cm.service';
import { Colormg } from '../colormg';

@Component({
  selector: 'nav-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  allColorsName: Colormg[];
  statusCode: number;
  //Create constructor to get service instance
  constructor(private colorService: CMService) {
  }

  ngOnInit(): void {
    this.getAllColors();
  }
  //Fetch all colors
  getAllColors() {
       this.colorService.getAllColors()
     .subscribe(
               data => this.allColorsName = data,
               errorCode =>  this.statusCode = errorCode);
  }

}
