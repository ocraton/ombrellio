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


  constructor( id: string, chalet_uid: string, cognome_cliente: string,
              nome_cliente: string, data_inizio: Date, data_fine: Date,
              anno_inizio: number, anno_fine: number,
              numero_ombrellone: string, uid_ombrellone: string, uid_cliente: string ) {

              this.id = id;
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

    }

}
