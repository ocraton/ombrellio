import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Clienti } from './clienti.model';
import { Observable } from 'rxjs';
import { Cliente } from './cliente.model';


@Injectable()

export class ClientiService {

    baseurl = '';

    constructor(private http: HttpClient) { }

    getAll(search: string = '', page: string = ''): Observable<Clienti> {        
        const url = `${this.baseurl}/user/clienti`;        
        return this.http.get<Clienti>(url,  {
            params: new HttpParams()
                    .set('search', search)
                    .set('page', page)
        });        
    }

    storeCliente(cliente: Cliente) {        
        const url = `${this.baseurl}/user/clienti`
        return this.http.post(url, {cliente});
    }

    updateCliente(id_cliente: number, cliente: Cliente) {        
        const url = `${this.baseurl}/user/clienti`
        return this.http.put(url, {id_cliente, cliente});
    }

    getCliente(id_cliente: number) {        
        const url = `${this.baseurl}/user/clienti/${id_cliente}`
        return this.http.get(url);
    }

    deleteCliente(id_cliente: number) {
        const url = `${this.baseurl}/user/clienti/${id_cliente}`
        // delete non ancora implementata lato server
        return this.http.get(url);
    }

}