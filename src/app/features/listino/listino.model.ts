export class Listino {

  public id: string;
  public numero_mese: number;
  public prezzi: any;




  constructor(id: string, numero_mese: number, prezzi: any ) {

      this.id = id;
      this.numero_mese = numero_mese;
      this.prezzi = prezzi;

    }

}
