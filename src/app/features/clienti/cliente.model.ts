export class Cliente {

    public id: string;
    public nome: string;
    public cognome: string;
    public c_fiscale: string;
    public data_nascita: string;
    public indirizzo: string;
    public citta: string;
    public provincia: string;
    public cap: string;
    public cellulare: string;
    public email: string;

    constructor(id: string, nome: string, cognome: string, c_fiscale: string,
                data_nascita: string, indirizzo: string,
                citta: string, provincia: string, cap: string, 
                cellulare: string, email: string) {

        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.c_fiscale = c_fiscale;
        this.data_nascita = data_nascita;
        this.indirizzo = indirizzo;
        this.citta = citta;
        this.provincia = provincia;
        this.cap = cap;
        this.cellulare = cellulare;
        this.email = email;

    }

}