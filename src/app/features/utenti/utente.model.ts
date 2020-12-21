export class Utente {

    public id: string;
    public chalet_uid: string;
    public nome: string;
    public cognome: string;
    public telefono: string;
    public email: string;
    public password: string;


  constructor(id: string, chalet_uid: string, nome: string, cognome: string,
              telefono: string, email: string, password: string) {

        this.id = id;
        this.chalet_uid = chalet_uid;
        this.nome = nome;
        this.cognome = cognome;
        this.telefono = telefono;
        this.email = email;
        this.password = password;

    }

}
