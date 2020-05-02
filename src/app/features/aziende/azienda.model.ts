export class Azienda {

    public id: string;
    public uid_utente: string;
    public ragione_sociale: string;
    public indirizzo: {cap, citta, civico, nazione, provincia, via};
    public partita_iva: string;
    public codice_ateco: string;
    public pec: string;
    public email: string;
    public numero_rea: string;
    public data_visura_evasione_ccia: Date;
    public telefono: string[];
    public created_at: Date;


    constructor(id: string, uid_utente: string, ragione_sociale: string,
                indirizzo: any, partita_iva: string,
                codice_ateco: string, pec: string, email: string,
                numero_rea: string, data_visura_evasione_ccia: Date, telefono: string[], created_at: Date) {

        this.id = id;
        this.uid_utente = uid_utente;
        this.ragione_sociale = ragione_sociale;
        this.indirizzo = indirizzo;
        this.partita_iva = partita_iva;
        this.codice_ateco = codice_ateco;
        this.pec = pec;
        this.email = email;
        this.numero_rea = numero_rea;
        this.data_visura_evasione_ccia = data_visura_evasione_ccia;
        this.telefono = telefono;
        this.created_at = created_at;

    }

}
