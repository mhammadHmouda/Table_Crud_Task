import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { User } from '../../type';

@Component({
  selector: 'app-qtz-form',
  templateUrl: './qtz-form.component.html',
  styleUrls: ['./qtz-form.component.css']
})
export class QtzFormComponent implements OnInit {
  formData: any;

  constructor(
    public dialogRef: MatDialogRef<QtzFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.formData = { ...this.data.item };
  }

  onClose(): void {
    this.dialogRef.close();
  }

  onUpdate(): void {
    this.dialogRef.close(this.formData);
  }
}