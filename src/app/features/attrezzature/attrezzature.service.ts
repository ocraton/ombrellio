import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Attrezzature } from './attrezzature.model';
import { Observable } from 'rxjs';
import { Attrezzatura } from './attrezzatura.model';


@Injectable()

export class AttrezzatureService {

    baseurl = '';

    constructor(private http: HttpClient) { }

    getAll(search: string = '', page: string = ''): Observable<Attrezzature> {        
        const url = `${this.baseurl}/user/attrezzature`;        
        return this.http.get<Attrezzature>(url,  {
            params: new HttpParams()
                    .set('search', search)
                    .set('page', page)
        });        
    }

    storeAttrezzatura(attrezzatura: Attrezzatura) {        
        const url = `${this.baseurl}/user/attrezzature`
        return this.http.post(url, {attrezzatura});
    }

    updateAttrezzatura(id_attrezzatura: number, attrezzatura: Attrezzatura) {        
        const url = `${this.baseurl}/user/attrezzature`
        return this.http.put(url, {id_attrezzatura, attrezzatura});
    }

    getAttrezzatura(id_attrezzatura: number) {        
        const url = `${this.baseurl}/user/attrezzature/${id_attrezzatura}`
        return this.http.get(url);
    }

    deleteAttrezzatura(id_attrezzatura: number) {
        const url = `${this.baseurl}/user/attrezzature/${id_attrezzatura}`
        // delete non ancora implementata lato server
        return this.http.get(url);
    }

}