import { Categoria } from './../categorie/categoria.model';
import { Observable } from 'rxjs';
import { MenuService } from './menu.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { Prodotto } from '../prodotti/prodotto.model';
import { Chalet } from '../chalet/chalet.model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {


  chaletExist=false;
  chaletUID='';
  categorie: Observable<Categoria[]>;
  prodotti: Observable<Prodotto[]>;
  chalet: Chalet;

  constructor(private route: ActivatedRoute,
              private menuService: MenuService,
              private titleService: Title) { }

  ngOnInit(): void {

    this.route.params.pipe(
        switchMap((params: Params) => {
          this.chaletUID = params.id;
            return this.menuService.getOneAtLeast(params.id)
        })
      )
      .subscribe(res => {
        (res[0].id != '') ? this.chaletExist = true : false;
        this.menuService.getChaletInfo(this.chaletUID)
        .subscribe((chalet: Chalet) => {
          this.chalet = chalet;
          this.titleService.setTitle(`Menù | ${chalet.ragione_sociale}`);
        })
        this.categorie = this.menuService.getAllProdottiCategorie(this.chaletUID)
        this.prodotti = this.menuService.getProdotti(this.chaletUID)
      })


  }

}
