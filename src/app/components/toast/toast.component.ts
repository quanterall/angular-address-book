import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss'],
})
export class ToastComponent implements OnInit {
  @ViewChild('element', { static: false }) progressBar!: ElementRef;
  progressInterval: any;

  constructor(public toastService: ToastService) {
    this.toastService.open.subscribe((data) => {
      if (data.show) {
        this.countDown();
      }
    });
  }

  ngOnInit() {}

  countDown() {
    this.progressBar.nativeElement.style.width =
      this.toastService.data.progress;

    this.progressInterval = setInterval(() => {
      const width = parseInt(this.progressBar.nativeElement.style.width, 10);

      if (width <= 0) {
        this.toastService.hide();
        clearInterval(this.progressInterval);
        return;
      }

      this.toastService.data.progress = String(width - 2);
      this.progressBar.nativeElement.style.width =
        this.toastService.data.progress + '%';
    }, 150);
  }

  stopCountDown() {
    clearInterval(this.progressInterval);
  }

  toggleToast() {
    if (this.toastService.data && this.toastService.data.show)
      return { right: '40px' };
    else {
      return { visibility: 'hidden' };
    }
  }
}
