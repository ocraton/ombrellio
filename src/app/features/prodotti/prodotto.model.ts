export class Prodotto {

  public id: string;
  public categoria_uid: string;
  public nome: string;
  public descrizione: string;
  public prezzo: number;
  public visibile: boolean;
  public min_quantita: number;
  public allergeni: any[];


  constructor(id: string, categoria_uid: string, nome: string, descrizione: string,
    prezzo: number, visibile: boolean, min_quantita: number, allergeni: any[]) {

    this.id = id;
    this.categoria_uid = categoria_uid;
    this.nome = nome;
    this.descrizione = descrizione;
    this.prezzo = prezzo;
    this.visibile = visibile;
    this.min_quantita = min_quantita;
    this.allergeni = allergeni;

  }

}
