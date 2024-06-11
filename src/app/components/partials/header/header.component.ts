import { NgClass, isPlatformBrowser } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild, Inject, PLATFORM_ID, Renderer2 } from '@angular/core';
import { RouterLink, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, NgClass],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{

  isHome:Boolean;
  @ViewChild('header') headerElement!: ElementRef;
  @ViewChild('h1') h1Element!: ElementRef;
  @ViewChild('testingLink') testingLinkElement!: ElementRef;

  constructor(
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      // Check if the current route is the home page
      if (event instanceof NavigationEnd) this.isHome = event.urlAfterRedirects === '/';
    });
    if (isPlatformBrowser(this.platformId)) window.addEventListener('scroll', this.scrollHeader);
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) window.removeEventListener('scroll', this.scrollHeader);
  }

  scrollHeader = () => {
    if (window.scrollY > 1) {
      this.renderer.addClass(this.headerElement.nativeElement, 'scrollHeader');
      this.renderer.addClass(this.h1Element.nativeElement, 'headerTitle');
    } else {
      this.renderer.removeClass(this.headerElement.nativeElement, 'scrollHeader');
      this.renderer.removeClass(this.h1Element.nativeElement, 'headerTitle');
    }

    if (window.scrollY >= 560) {
      this.renderer.addClass(this.testingLinkElement.nativeElement, 'scrollLink');
    } else {
      this.renderer.removeClass(this.testingLinkElement.nativeElement, 'scrollLink');
    }
   
  }
}
