export class Ordine {

    public id: string;
    public utente_uid: string;
    public chalet_uid: string;
    public completato: boolean;
    public verificato: boolean;
    public annullato: boolean;
    public contenuto: [];
    public created_at: Date;
    public note: string;
    public numero_ombrellone: string;
    public ombrellone_uid: string;
    public numero_tavolo: string;
    public tavolo_uid: string;
    public numero_telefono: string;
    public prezzo_totale: string;
    public quantita_totale: string;


  constructor(id: string, utente_uid: string, chalet_uid: string, completato: boolean,
              verificato: boolean, annullato: boolean,contenuto: [], created_at: Date,
              note: string, numero_ombrellone: string, ombrellone_uid: string,
              numero_tavolo: string, tavolo_uid: string, numero_telefono: string,
              prezzo_totale: string, quantita_totale: string) {

        this.id = id;
        this.utente_uid = utente_uid;
        this.chalet_uid = chalet_uid;
        this.completato = completato;
        this.verificato = verificato;
        this.annullato = annullato;
        this.contenuto = contenuto
        this.created_at = created_at;
        this.note = note;
        this.numero_ombrellone = numero_ombrellone;
        this.ombrellone_uid = ombrellone_uid;
        this.numero_tavolo = numero_tavolo;
        this.tavolo_uid = tavolo_uid;
        this.numero_telefono = numero_telefono;
        this.prezzo_totale = prezzo_totale;
        this.quantita_totale = quantita_totale;


    }

}
