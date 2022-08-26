import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class WorkflowService {
    constructor(private httpClient: HttpClient) { }

    public getStorageLocations(): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'storageLocations');
    }

    public getWorkflows(): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'workflows');
    }

    public getWorkflow(id: number): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'workflows/' + id);
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


    public saveWorkflow(postData: any): Observable<any> {
        return this.httpClient.post<any>(environment.url + 'workflow', postData);
    }

}