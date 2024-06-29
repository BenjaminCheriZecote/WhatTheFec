import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SquareGlossaryIconComponent } from './square-glossary-icon.component';

describe('SquareGlossaryIconComponent', () => {
  let component: SquareGlossaryIconComponent;
  let fixture: ComponentFixture<SquareGlossaryIconComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SquareGlossaryIconComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SquareGlossaryIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
