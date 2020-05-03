export class Chalet {

    public id: string;
    public utente_uid: string;
    public ragione_sociale: string;
    public indirizzo: {cap, citta, civico, provincia, via};
    public telefono: string[];
    public created_at: Date;


    constructor(id: string, uid_utente: string, ragione_sociale: string,
                indirizzo: any, telefono: string[], created_at: Date) {

        this.id = id;
        this.utente_uid = uid_utente;
        this.ragione_sociale = ragione_sociale;
        this.indirizzo = indirizzo;
        this.telefono = telefono;
        this.created_at = created_at;

    }

}
