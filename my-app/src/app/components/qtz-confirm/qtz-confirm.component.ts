import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ConfirmationService } from '../../shared/confirmation.service';

@Component({
  selector: 'app-qtz-confirm',
  templateUrl: './qtz-confirm.component.html',
  styleUrls: ['./qtz-confirm.component.css']
})
export class QtzConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<QtzConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private confirmationService: ConfirmationService
  ) {}

  confirm() {
    this.confirmationService.confirmDelete(this.data.id);
    this.dialogRef.close('confirm');
  }

  cancel() {
    this.dialogRef.close('cancel');
  }
}