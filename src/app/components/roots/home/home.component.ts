import { Component, Inject, PLATFORM_ID, AfterViewInit } from '@angular/core';
import { ArticleHome } from '../../helpers/types/articleHome';
import { isPlatformBrowser } from '@angular/common';
import { SafariService } from '../../helpers/services/safari/safari.service';
SafariService

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements AfterViewInit {
  articlesHome:ArticleHome[];
  isSafari: boolean = false;
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private safariService: SafariService
  ) {}
  
  ngAfterViewInit(): void {
    setTimeout(() => {
      this.detectAndInitialize();
    }, 0);
  }

  detectAndInitialize(): void {
    if (typeof window !== 'undefined' && typeof navigator !== 'undefined') {
      this.isSafari = this.safariService.detectSafari();
      
      if (!this.isSafari) {
        this.showElements();
      }
    } else {
      this.isSafari = true;
    }
  }

  showElements = () => {
    if (isPlatformBrowser(this.platformId)) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('show');
          } 
        })
      })
      const hiddenElements = document.querySelectorAll('.hidden');
      hiddenElements.forEach((el) => observer.observe(el));
      const hidden2Elements = document.querySelectorAll('.hidden2');
      hidden2Elements.forEach((el) => observer.observe(el));
    }
  } 
}
