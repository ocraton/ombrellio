export class Cliente {

    public id: string;
    public nome: string;
    public cognome: string;
    public telefono: string;
    public email: string;


  constructor(id: string, nome: string, cognome: string,
              telefono: any, email: string) {

        this.id = id;
        this.nome = nome;
        this.cognome = cognome;
        this.telefono = telefono;
        this.email = email;

    }

}
