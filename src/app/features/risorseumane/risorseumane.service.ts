import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Risorseumane } from './risorseumane.model';
import { Risorsaumana } from './risorsaumana.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class RisorseumaneService {

  baseurl = '';

  constructor(private http: HttpClient) { }

  getAll(search: string = '', page: string = '', azienda_id: string = ''): Observable<Risorseumane> {        
      const url = `${this.baseurl}/user/risorseumane`;        
      return this.http.get<Risorseumane>(url,  {
          params: new HttpParams()
                  .set('search', search)
                  .set('page', page)
                  .set('azienda_id', azienda_id)
      });        
  }

  getRisorsaumana(id_risorsaumana: number) {        
    const url = `${this.baseurl}/user/risorseumane/${id_risorsaumana}`
    return this.http.get(url);
  }


  storeRisorsaumana(risorsaumana: Risorsaumana) {        
      const url = `${this.baseurl}/user/risorseumane`
      return this.http.post(url, {risorsaumana});
  }

  updateRisorsaumana(id_risorsaumana: number, risorsaumana: Risorsaumana) {        
      const url = `${this.baseurl}/user/risorseumane`
      return this.http.put(url, {id_risorsaumana, risorsaumana});
  }

  deleteRisorsaumana(id_risorsaumana: number) {
      const url = `${this.baseurl}/user/risorseumane/${id_risorsaumana}`
      // delete non ancora implementata lato server
      return this.http.get(url);
  }
  
}
