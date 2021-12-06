export class Attrezzatura {

  public id: string;
  public nome: string;
  public ordinamento: number;
  public visibile: boolean;

  constructor(id: string, nome: string, ordinamento: number, visibile: boolean) {

    this.id = id;
    this.nome = nome;
    this.ordinamento = ordinamento;
    this.visibile = visibile;

  }

}
