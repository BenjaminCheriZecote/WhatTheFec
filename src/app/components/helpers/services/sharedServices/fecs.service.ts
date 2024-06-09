import { Injectable } from '@angular/core';
import { Fec } from '../../types/Fec';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FecService {
  private fecs = new BehaviorSubject<Fec[]>([]);
  private fec = new BehaviorSubject<Fec|null>(null);

  constructor() { }

  setFecs(value:Fec) : void {
    const currentFecs = this.fecs.getValue();
    this.fecs.next([...currentFecs, value])
  }
  getFecs() : any {
    return this.fecs.asObservable();
  }

  setFec(value:Fec) : void {
    this.fec.next(value);
  }
  getFec() : any {
    return this.fec.asObservable();
  }
}
