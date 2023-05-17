import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export enum toastTypes {
  error,
  success,
}

export interface ToastData {
  title: string;
  content: string;
  show?: boolean;
  type?: toastTypes;
  progress?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  data!: ToastData;
  public open = new Subject<ToastData>();

  initiate(data: ToastData) {
    if (data.type) {
      this.data.type = toastTypes.error;
    }
    this.data = { ...data, show: true, progress: '100%' };
    this.open.next(this.data);
  }

  hide() {
    this.data = { ...this.data, show: false };
    this.open.next(this.data);
  }
}
