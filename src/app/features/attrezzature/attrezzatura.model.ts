export class Attrezzatura {

    public id: string;
    public matricola: string;
    public denominazione: string;
    public tipologia_id: number;
    public costruttore: string;
    public modello: string;
    public anno_costruzione: string;
    public manuale_libretto: string;
    public cespite: string;
    public messa_in_servizio: string;
    public verifica_periodica: string;


    constructor(    id: string,
                    matricola: string,
                    denominazione: string,
                    tipologia_id: number,
                    costruttore: string,
                    modello: string,
                    anno_costruzione: string,
                    manuale_libretto: string,
                    cespite: string,
                    messa_in_servizio: string,
                    verifica_periodica: string) {

                    this.id = id;
                    this.matricola = matricola;
                    this.denominazione = denominazione;
                    this.tipologia_id = tipologia_id;
                    this.costruttore = costruttore;
                    this.modello = modello;
                    this.anno_costruzione = anno_costruzione;
                    this.manuale_libretto = manuale_libretto;
                    this.cespite = cespite;
                    this.messa_in_servizio = messa_in_servizio;
                    this.verifica_periodica = verifica_periodica;


    }

}