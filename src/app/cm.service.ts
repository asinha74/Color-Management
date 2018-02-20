import { Injectable } from '@angular/core';
import { Http, Response, Headers, URLSearchParams, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { Colormg } from './colormg';

@Injectable()
export class CMService {
    //URL for CRUD operations
	colorManagementUrl = "http://localhost:3000/posts";
	//Create constructor to get Http instance
	constructor(private http:Http) {
	}
	//Fetch all colormanagements
    getAllColors(): Observable<Colormg[]> {
        return this.http.get(this.colorManagementUrl)
		   		.map(this.extractData)
		        .catch(this.handleError);

    }
	//Create colormanagement
    createColor(colormanagement: Colormg):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.post(this.colorManagementUrl, colormanagement, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
	//Fetch colormanagement by id
    getColorById(colorId: string): Observable<Colormg> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		console.log(this.colorManagementUrl +"/"+ colorId);
		return this.http.get(this.colorManagementUrl +"/"+ colorId)
			   .map(this.extractData)
			   .catch(this.handleError);
    }
	//Update colormanagement
    updateColor(colormanagement: Colormg):Observable<number> {
	    let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: cpHeaders });
        return this.http.put(this.colorManagementUrl +"/"+ colormanagement.id, colormanagement, options)
               .map(success => success.status)
               .catch(this.handleError);
    }
    //Delete colormanagement
    deleteColorById(colorId: string): Observable<number> {
		let cpHeaders = new Headers({ 'Content-Type': 'application/json' });
		let options = new RequestOptions({ headers: cpHeaders });
		return this.http.delete(this.colorManagementUrl +"/"+ colorId)
			   .map(success => success.status)
			   .catch(this.handleError);
    }
	private extractData(res: Response) {
	    let body = res.json();
        return body;
    }
    private handleError (error: Response | any) {
		console.error(error.message || error);
		return Observable.throw(error.status);
    }
}
