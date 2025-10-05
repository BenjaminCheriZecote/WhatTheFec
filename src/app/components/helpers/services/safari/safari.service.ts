import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SafariService {

  constructor() { }

  detectSafari(): boolean {
    const userAgent = navigator.userAgent.toLowerCase();
    const isSafari = /^((?!chrome|android).)*safari/i.test(userAgent);
    return isSafari;
  }
}
