import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { QtzFormComponent } from '../qtz-form/qtz-form.component';
import {MatSnackBar, MatSnackBarConfig} from '@angular/material/snack-bar';
import { QtzConfirmComponent } from '../qtz-confirm/qtz-confirm.component';
import { User } from '../../type';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DBService } from '../../shared/db.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-qtz-table',
  templateUrl: './qtz-table.component.html',
  styleUrl: './qtz-table.component.css'
})

export class QtzTableComponent {
  
  data: User[] = []
  displayedColumns: string[] = []
  dataSource: MatTableDataSource<User>;
  selectedItem: User | undefined;
  dataSubscription!: Subscription;
  initialized: boolean = false;


  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private dbService: DBService
  ) {
    this.dataSource = new MatTableDataSource<User>(this.data);
  }

  ngOnInit(): void {
    this.initializeData();
    this.onAddUser();
    this.onSearchUsers();
  }

  ngAfterViewInit() {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  ngOnDestroy(): void {
    this.dataSubscription.unsubscribe();
  }

  private initializeData(): void {
    this.data = this.dbService.getUsers();
    this.displayedColumns = Object.keys(this.data[0]);
    this.displayedColumns.push('operations');
    this.dataSource.data = this.data;
  }

  private onAddUser(): void {
    this.dataSubscription = this.dbService.getUsersObservable().subscribe(() => {
      if (this.initialized) {
        this.updateDataSource();
        this.showSnackbar('User added successfully');
      } else {
        this.initialized = true;
      }
    });
  }

  private onSearchUsers(): void {
    this.dbService.searchUserObservable().subscribe(query => {
      if(query !== '' || query !== undefined || query !== null) {
        const filteredUsers = this.data.filter(user => 
          user.firstName.toLowerCase().includes(query.toLowerCase())
          || user.secondName.toLowerCase().includes(query.toLowerCase())
          || user.lastName.toLowerCase().includes(query.toLowerCase())
          || user.age.toString().includes(query.toLowerCase())
        ); 
        
        this.dataSource.data = filteredUsers;       
      }
    })
  }

  onUpdate(item: User) {
    this.selectedItem = item;
    const dialogRef = this.dialog.open(QtzFormComponent, {
      width: '350px',
      data: { item: this.selectedItem }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
          this.dbService.updateUser(result);
          this.data = this.dbService.getUsers();
          this.updateDataSource();
          this.showSnackbar('User updated successfully');
      }
    });
  }

  deleteRow(item: User) {
    const dialogRef = this.dialog.open(QtzConfirmComponent, {
      width: '380px',
      height: '200px',
      data: { id: item.id }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'confirm') {
        this.dbService.deleteUser(item.id);
        this.data = this.dbService.getUsers();
        this.updateDataSource();
        this.showSnackbar('User deleted successfully');
      }
    });
  }

  private updateDataSource() {
    this.dataSource.data = [...this.data];
  }

  private showSnackbar(message: string) {
    this.snackBar.open(message, 'Close', {duration: 3000});
  }
}