import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule,
  MatCheckboxModule,
  MatButtonModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatBadgeModule,
  MatDialogModule,
  MatFormFieldModule,
  MatSelectModule,
  MatSnackBarModule,
  MatNativeDateModule,
  MAT_DATE_LOCALE,
  MatExpansionModule,
  MatChipsModule
} from '@angular/material';
import { MatInputModule } from '@angular/material/input';
import {MatGridListModule} from '@angular/material/grid-list';
import { FlexLayoutModule } from '@angular/flex-layout';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule, MatPaginatorIntl} from '@angular/material/paginator';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatTabsModule} from '@angular/material/tabs';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CategoriaEditComponent } from '../features/categorie/categoria-edit/categoria-edit.component';
import { CategoriaDeleteComponent } from '../features/categorie/categoria-delete/categoria-delete.component';
import { ProdottoEditComponent } from '../features/prodotti/prodotto-edit/prodotto-edit.component';
import { ProdottoDeleteComponent } from '../features/prodotti/prodotto-delete/prodotto-delete.component';
import { ProdottoAddComponent } from '../features/prodotti/prodotto-add/prodotto-add.component';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FlexLayoutModule,
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatChipsModule,
    DragDropModule
  ],
  exports: [
    MatToolbarModule,
    MatCheckboxModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatInputModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatBadgeModule,
    MatDialogModule,
    MatFormFieldModule,
    MatSelectModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatButtonToggleModule,
    MatExpansionModule,
    MatChipsModule,
    DragDropModule
  ],
  entryComponents: [CategoriaEditComponent, CategoriaDeleteComponent,
                    ProdottoEditComponent, ProdottoDeleteComponent,
                    ProdottoAddComponent],
  providers: [MatPaginatorIntl, MatDatepickerModule, MatNativeDateModule,
              {provide: MAT_DATE_LOCALE, useValue: 'it-IT'},
            ]
})
export class MaterialDesignModule { }
