import { Injectable } from '@angular/core';
import { Instrument } from '../models/instrument.model';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  instrument!: Instrument;
  showDialog: boolean = false;

  constructor() {}

  getInstrumentName() {
    return this.instrument.name;
  }
}
