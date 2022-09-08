import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class HardwareService {
    constructor(private httpClient: HttpClient) { }

    public getHardwares(): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'hardwares');
    }

    public getHardware(id: number): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'hardwares/' + id);
    }

    public saveHardware(postData: any): Observable<any> {
        return this.httpClient.post<any>(environment.url + 'hardwares', postData);
    }
}