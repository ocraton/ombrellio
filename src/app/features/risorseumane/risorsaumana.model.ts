export class Risorsaumana { 

    public id: string;
    public azienda_id: string;
    public nome: string;
    public cognome: string;
    public c_fiscale: string;
    public data_nascita: string;
    public luogo_nascita: string;
    public indirizzo: string;
    public citta: string;
    public provincia: string;
    public cap: string;
    public genere: string;
    public nazionalita: string;
    public tel_casa: string;
    public cellulare: string;
    public email: string;
    public n_patente_guida: string;


    constructor(id: string, azienda_id: string, nome: string, cognome: string, 
                c_fiscale: string, data_nascita: string, 
                luogo_nascita: string, indirizzo: string,
                citta: string, provincia: string, cap: string,
                genere: string, nazionalita: string, tel_casa: string,
                cellulare: string, email: string, n_patente_guida: string) {

        this.id = id;
        this.azienda_id = azienda_id;
        this.nome = nome;
        this.cognome = cognome;
        this.c_fiscale = c_fiscale;
        this.data_nascita = data_nascita;
        this.luogo_nascita = luogo_nascita;
        this.indirizzo = indirizzo;
        this.citta = citta;
        this.provincia = provincia;
        this.cap = cap;
        this.genere = genere;
        this.nazionalita = nazionalita;
        this.tel_casa = tel_casa;
        this.cellulare = cellulare;
        this.email = email;
        this.n_patente_guida = n_patente_guida;

    }

}