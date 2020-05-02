import { Requisito } from './requisito.model';

export class Requisiti {

    public current_page: string;
    public data: Requisito[];
    public first_page_url: string;
    public from: string;
    public last_page: string;
    public last_page_url: string;
    public next_page_url: string;
    public path: string;
    public per_page: string;
    public prev_page_url: string;
    public to: string;
    public total: string;

    constructor(current_page: string, data: Requisito[], first_page_url: string,
                from: string, last_page: string, last_page_url: string, next_page_url: string,
                path: string, per_page: string, prev_page_url: string,
                to: string, total: string) {

        this.current_page = current_page;
        this.data = data;
        this.first_page_url = first_page_url;
        this.from = from;
        this.last_page = last_page;
        this.last_page_url = last_page_url;
        this.next_page_url = next_page_url;
        this.path = path;
        this.per_page = per_page;
        this.prev_page_url = prev_page_url;
        this.to = to;
        this.to = total;

    }

}