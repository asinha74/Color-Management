import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { CMService } from '../cm.service';
import { Colormg } from '../colormg';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.scss']
})
export class GridComponent implements OnInit {

  //Component properties
  allColors: Colormg[];
  statusCode: number;
  requestProcessing = false;
  colorIdToUpdate = null;
  processValidation = false;
  //Create form
  colorForm = new FormGroup({
       name: new FormControl('', Validators.required),
       description: new FormControl('', Validators.required),
       iconClass: new FormControl('', Validators.required)
   });
   //Create constructor to get service instance
   constructor(private colorService: CMService) {
   }
   //Create ngOnInit() and and load articles
   ngOnInit(): void {
	   this.getAllColors();
   }
   //Fetch all colors
   getAllColors() {
      this.colorService.getAllColors()
		  .subscribe(
        data => this.allColors = data,
        errorCode =>  this.statusCode = errorCode);
   }

   //Handle create and update color
   onColorFormSubmit() {
	  this.processValidation = true;
	  if (this.colorForm.invalid) {
	       return; //Validation failed, exit from method.
	  }
	  //Form is valid, now perform create or update
    this.preProcessConfigurations();
	  let color = this.colorForm.value;
	  if (this.colorIdToUpdate === null) {
	    //Generate article id then create article
        this.colorService.getAllColors()
	     .subscribe(colors => {

		   //Generate color id
		   let maxIndex = colors.length - 1;
		   let colorWithMaxIndex = colors[maxIndex];
		   let colorId = colorWithMaxIndex.id + 1;
		   color.id = colorId;

		   //Create color
     	   this.colorService.createColor(color)
			  .subscribe(successCode => {
					this.statusCode = successCode;
					this.getAllColors();
					this.backToCreateColor();
				 },
				 errorCode => this.statusCode = errorCode
			   );
		 });
	  } else {
   	    //Handle update article
        color.id = this.colorIdToUpdate;
	       this.colorService.updateColor(color)
	      .subscribe(successCode => {
          this.statusCode = successCode;
          this.getAllColors();
          this.backToCreateColor();
			    },
		        errorCode => this.statusCode = errorCode);
	  }
   }
   //Load color by id to edit
   loadColorToEdit(colorId: string) {
      this.preProcessConfigurations();
      this.colorService.getColorById(colorId)
	      .subscribe(colors => {
          this.colorIdToUpdate = colors.id;
          this.colorForm.setValue({ name: colors.name, description: colors.description, iconClass: colors.iconClass });
					this.processValidation = true;
					this.requestProcessing = false;
		        },
		        errorCode =>  this.statusCode = errorCode);
   }
   //Delete color
   deleteColor(colorId: string) {
      this.preProcessConfigurations();
      this.colorService.deleteColorById(colorId)
        .subscribe(successCode => {
  				//Expecting success code 204 from server
  				this.statusCode = 204;
  			    this.getAllColors();
  			    this.backToCreateColor();
  		    },
            errorCode => this.statusCode = errorCode);
   }
   //Perform preliminary processing configurations
   preProcessConfigurations() {
    this.statusCode = null;
    this.requestProcessing = true;
   }
   //Go back from update to create
   backToCreateColor() {
    this.colorIdToUpdate = null;
    this.colorForm.reset();
    this.processValidation = false;
   }
}
