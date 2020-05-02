import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Mansioni } from './mansioni.model';
import { Observable } from 'rxjs';
import { Mansione } from './mansione.model';


@Injectable()

export class MansioniService {

    baseurl = '';

    constructor(private http: HttpClient) { }

    getAll(search: string = '', page: string = ''): Observable<Mansioni> {        
        const url = `${this.baseurl}/user/mansioni`;        
        return this.http.get<Mansioni>(url,  {
            params: new HttpParams()
                    .set('search', search)
                    .set('page', page)
        });        
    }

    getMansione(id_mansione: number) {        
        const url = `${this.baseurl}/user/mansioni/${id_mansione}`
        return this.http.get(url);
    }

    storeMansione(mansione: Mansione) {        
        const url = `${this.baseurl}/user/mansioni`
        return this.http.post(url, {mansione});
    }

    updateMansione(id_mansione: number, mansione: Mansione) {        
        const url = `${this.baseurl}/user/mansioni`
        return this.http.put(url, {id_mansione, mansione});
    }

    deleteMansione(id_mansione: number) {
        const url = `${this.baseurl}/user/mansioni/${id_mansione}`
        // delete non ancora implementata lato server
        return this.http.get(url);
    }

}