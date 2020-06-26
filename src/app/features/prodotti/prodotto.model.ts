export class Prodotto {

    public id: string;
    public categoria_uid: string;
    public nome: string;
    public descrizione: string;
    public prezzo: number;
    public visibile: boolean;


  constructor(id: string, categoria_uid: string, nome: string,
              descrizione: string, prezzo: number, visibile: boolean) {

        this.id = id;
        this.categoria_uid = categoria_uid;
        this.nome = nome;
        this.descrizione = descrizione;
        this.prezzo = prezzo;
        this.visibile = visibile;

    }

}
