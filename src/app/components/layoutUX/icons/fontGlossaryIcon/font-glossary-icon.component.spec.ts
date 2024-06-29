import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FontGlossaryIconComponent } from './font-glossary-icon.component';

describe('FontGlossaryIconComponent', () => {
  let component: FontGlossaryIconComponent;
  let fixture: ComponentFixture<FontGlossaryIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FontGlossaryIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FontGlossaryIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
