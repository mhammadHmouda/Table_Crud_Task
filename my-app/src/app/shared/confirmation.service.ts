import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConfirmationService {
  private confirmDeleteSubject = new Subject<number>();

  confirmDelete$ = this.confirmDeleteSubject.asObservable();

  constructor() {}

  confirmDelete(id: number) {
    this.confirmDeleteSubject.next(id);
  }
}