import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DBService } from '../../shared/db.service';
import { QtzFormComponent } from '../qtz-form/qtz-form.component';

@Component({
  selector: 'app-qtz-searchbar',
  templateUrl: './qtz-searchbar.component.html',
  styleUrls: ['./qtz-searchbar.component.css']
})
export class QtzSearchbarComponent {
  
  constructor(private dialog: MatDialog, private dbService: DBService) {}

  openForm() {
    const dialogRef = this.dialog.open(QtzFormComponent, {
      width: '350px',
      data: { item: {} }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.dbService.addUser(result);
    });
  }

  searchUsers(event: any): void {  
    this.dbService.searchUsers(event);
  }
}