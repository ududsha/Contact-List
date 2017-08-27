import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

@Injectable()
export class ContactService {

    private headers = new Headers({ 'Content-Type': 'application/json', 'charset': 'UTF-8' });
    private options = new RequestOptions({ headers: this.headers });

    constructor(private http: Http) {

    }

    getContacts(): Observable<any> {
        return this.http.get('/api/contacts').map(res => res.json());
    }

    getContact(contact): Observable<any> {
        return this.http.get(`/api/contact/${contact._id}`).map(res => res.json());
    }

    addContact(contact): Observable<any> {
        return this.http.post('/api/contact', JSON.stringify(contact), this.options);
    }
}
