import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GlossaryReportFecComponent } from './glossary-report-fec.component';

describe('GlossaryReportFecComponent', () => {
  let component: GlossaryReportFecComponent;
  let fixture: ComponentFixture<GlossaryReportFecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GlossaryReportFecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GlossaryReportFecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
