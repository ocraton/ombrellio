export class Utente {

    public id: string;
    public chalet_uid: string;
    public nome: string;
    public cognome: string;
    public telefono: string;
    public email: string;
    public password: string;
    public userType: string;
    public data_rinnovo: Date;
    public data_scadenza: Date;



  constructor(id: string, chalet_uid: string, nome: string, cognome: string,
              telefono: string, email: string, password: string,
              userType: string, data_rinnovo: Date, data_scadenza: Date) {

        this.id = id;
        this.chalet_uid = chalet_uid;
        this.nome = nome;
        this.cognome = cognome;
        this.telefono = telefono;
        this.email = email;
        this.password = password;
        this.userType = userType;
        this.data_rinnovo = data_rinnovo;
        this.data_scadenza = data_scadenza;

    }

}
