import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    constructor(private httpClient: HttpClient) { }

    public getOrders(): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'orders');
    }

    public getOrder(id: number): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'orders/' + id);
    }

    public getInventory(): Observable<any[]> {
        return this.httpClient.get<any[]>(environment.url + 'inventory');
    }

    public saveOrder(postData: any): Observable<any> {
        return this.httpClient.post<any>(environment.url + 'order', postData);
    }
}