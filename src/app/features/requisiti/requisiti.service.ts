import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Requisiti } from './requisiti.model';
import { Observable } from 'rxjs';
import { Requisito } from './requisito.model';


@Injectable()

export class RequisitiService {

    baseurl = '';

    constructor(private http: HttpClient) { }

    getAll(search: string = '', page: string = ''): Observable<Requisiti> {        
        const url = `${this.baseurl}/user/requisiti`;        
        return this.http.get<Requisiti>(url,  {
            params: new HttpParams()
                    .set('search', search)
                    .set('page', page)
        });        
    }

    storeRequisito(requisito: Requisito) {        
        const url = `${this.baseurl}/user/requisiti`
        return this.http.post(url, {requisito});
    }

    updateRequisito(id_requisito: number, requisito: Requisito) {        
        const url = `${this.baseurl}/user/requisiti`
        return this.http.put(url, {id_requisito, requisito});
    }

    getRequisito(id_requisito: number) {        
        const url = `${this.baseurl}/user/requisiti/${id_requisito}`
        return this.http.get(url);
    }

    deleteRequisito(id_requisito: number) {
        const url = `${this.baseurl}/user/requisiti/${id_requisito}`
        // delete non ancora implementata lato server
        return this.http.get(url);
    }

}