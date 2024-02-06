import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QtzTableComponent } from './qtz-table/qtz-table.component';
import { QtzFormComponent } from './qtz-form/qtz-form.component';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { QtzBarComponent } from './qtz-bar/qtz-bar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatTableModule} from '@angular/material/table';
import { QtzConfirmComponent } from './qtz-confirm/qtz-confirm.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { QtzSearchbarComponent } from './qtz-searchbar/qtz-searchbar.component';

@NgModule({
  declarations: [
    QtzTableComponent,
    QtzFormComponent,
    QtzBarComponent,
    QtzConfirmComponent,
    QtzSearchbarComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatPaginatorModule
  ],
  exports: [QtzTableComponent, QtzBarComponent, QtzFormComponent, QtzConfirmComponent, QtzSearchbarComponent]
})
export class ComponentsModule { }