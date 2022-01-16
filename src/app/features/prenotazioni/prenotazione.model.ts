import { Attrezzatura } from './../attrezzature/attrezzatura.model';

export class Prenotazione {

  public id: string;
  public chalet_uid: string;
  public cognome_cliente: string;
  public nome_cliente: string;
  public data_inizio: Date;
  public data_fine: Date;
  public anno_inizio: number;
  public anno_fine: number;
  public numero_ombrellone: string;
  public uid_ombrellone: string;
  public uid_cliente: string;
  public attrezzature: any[];
  public is_pagato: boolean;
  public is_stagionale: boolean;
  public acconto: number;
  public prezzo: number;
  public note: string;



  constructor( id: string, chalet_uid: string, cognome_cliente: string,
              nome_cliente: string, data_inizio: Date, data_fine: Date,
              anno_inizio: number, anno_fine: number,
              numero_ombrellone: string, uid_ombrellone: string, uid_cliente: string,
    attrezzature: any[], is_pagato: boolean, is_stagionale: boolean, acconto: number, prezzo: number, note: string ) {

            this.id = id;
            this.chalet_uid = chalet_uid;
            this.cognome_cliente = cognome_cliente;
            this.nome_cliente = nome_cliente;
            this.data_inizio = data_inizio;
            this.data_fine = data_fine;
            this.anno_inizio = anno_inizio;
            this.anno_fine = anno_fine;
            this.numero_ombrellone = numero_ombrellone;
            this.uid_ombrellone = uid_ombrellone;
            this.uid_cliente = uid_cliente;
            this.attrezzature = attrezzature;
            this.is_pagato = is_pagato;
            this.is_stagionale = is_stagionale;
            this.acconto = acconto;
            this.prezzo = prezzo;
            this.note = note;

    }

}
