import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class StepsService {
    constructor(private httpClient: HttpClient) { }

    public getHardwares(): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'hardwares');
    }

    public getSteps(): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'steps');
    }
    public getStep(id: number): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'steps/' + id);
    }

    public saveStep(postData: any): Observable<any> {
        return this.httpClient.post<any>(environment.url + 'step', postData);
    }
}