import { Component } from '@angular/core';
import { Instrument } from '../../models/instrument.model';
import { DialogService } from '../../services/dialog.service';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent {
  instruments: Instrument[];

  constructor(private dialogService: DialogService) {
    this.instruments = [{ name: 'AAPL' }, { name: 'MSTF' }, { name: 'NVDA' }];
  }

  openDialog(instrument: Instrument) {
    this.dialogService.showDialog = true;
    this.dialogService.instrument = instrument;
  }
}
