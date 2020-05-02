import { Requisito } from '../requisiti/requisito.model';

export class Mansione {

    public id: string;
    public denominazione: string;
    public descrizione: string;
    public requisiti: Requisito[];

    constructor(id: string, denominazione: string, descrizione: string, requisiti: Requisito[]) {

        this.id = id;
        this.denominazione = denominazione;
        this.descrizione = descrizione;
        this.requisiti = requisiti;

    }

}