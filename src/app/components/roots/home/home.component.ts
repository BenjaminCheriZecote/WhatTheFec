import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { ArticleHome } from '../../helpers/types/articleHome';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  articlesHome:ArticleHome[];
  
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object, 
  ) {}
  
  ngOnInit(): void {
    this.showElements();
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
