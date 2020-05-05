export class Ombrellone {

    public id: string;
    public utente_uid: string;
    public ragione_sociale: string;
    public indirizzo: {cap, citta, civico, provincia, via};
    public telefono: string;
    public codice_accesso: string;
    public created_at: Date;


  constructor(id: string, utente_uid: string, ragione_sociale: string,
              indirizzo: any, telefono: string, codice_accesso: string, created_at: Date) {

        this.id = id;
        this.utente_uid = utente_uid;
        this.ragione_sociale = ragione_sociale;
        this.indirizzo = indirizzo;
        this.telefono = telefono;
        this.codice_accesso = codice_accesso;
        this.created_at = created_at;

    }

}
