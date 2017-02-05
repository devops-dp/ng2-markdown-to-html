import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { ErrorObservable } from 'rxjs/Observable/ErrorObservable';

import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export class MarkdownToHtmlService {

  constructor(private http: Http) { }

  getSource(src: string): Observable<string> {
    return this.http.get(src)
      .map(this.extractData)
      .catch(this.handleError);
  }

  extractData(response: Response): string {
    return response.text() || '';
  }

  handleError(error: Response | any): ErrorObservable<string> {
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
