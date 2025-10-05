import { NgClass, isPlatformBrowser, NgIf } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';
import {LogoComponent} from '../../layoutUX/logo/logo.component';
import { SafariService } from '../../helpers/services/safari/safari.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass, LogoComponent, NgIf],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  isSafari: boolean;
  isHome:Boolean;
  @ViewChild('header') headerElement!: ElementRef;
  @ViewChild('h1') h1Element!: ElementRef;
  @ViewChild('testingLink') testingLinkElement!: ElementRef;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2,
    private safariService: SafariService
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      // Check if the current route is the home page
      if (event instanceof NavigationEnd) this.isHome = event.urlAfterRedirects === '/';
    });
    if (isPlatformBrowser(this.platformId)) window.addEventListener('scroll', this.scrollHeader);
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      this.isSafari = this.safariService.detectSafari();
    } else {
      this.isSafari = true;
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) window.removeEventListener('scroll', this.scrollHeader);
  }

  scrollHeader = () => {
    if (window.scrollY > 1) {
      if (this.isHome) this.renderer.addClass(this.headerElement.nativeElement, 'headerBis');
      if (this.isHome) this.renderer.removeClass(this.h1Element.nativeElement, 'headerHomeTitle');
      this.renderer.addClass(this.h1Element.nativeElement, 'headerTitle');
    } else {
      if (this.isHome) this.renderer.removeClass(this.headerElement.nativeElement, 'headerBis');
      if (this.isHome) this.renderer.removeClass(this.h1Element.nativeElement, 'headerTitle');
      if (this.isHome) this.renderer.addClass(this.h1Element.nativeElement, 'headerHomeTitle');
    }

    if (window.scrollY >= 560) {
      this.renderer.addClass(this.testingLinkElement.nativeElement, 'scrollLink');
    } else {
      this.renderer.removeClass(this.testingLinkElement.nativeElement, 'scrollLink');
    }
   
  }
}
