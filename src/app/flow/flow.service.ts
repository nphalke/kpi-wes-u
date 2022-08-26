import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class FlowService {
    constructor(private httpClient: HttpClient) { }

    public getSteps(): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'steps');
    }

    public getFlows(): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'flows');
    }

    public getFlow(id: number): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'flows/' + id);
    }

    public getFlowSteps(id: number): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'flowsteps/' + id);
    }


    public saveFlow(postData: any): Observable<any> {
        // let httpHeaders = new HttpHeaders({
        //     'Content-Type': 'application/json',
        //     'Cache-Control': 'no-cache'
        // });
        // return this.http.post(this.url, book, { headers: httpHeaders }).pipe(
        //     map(this.extractData),
        //     catchError(this.handleErrorObservable)
        // );
        return this.httpClient.post<any>(environment.url + 'flow', postData);
    }

}