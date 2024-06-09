import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataFecFileComponent } from './data-fec-file.component';

describe('DataFecFileComponent', () => {
  let component: DataFecFileComponent;
  let fixture: ComponentFixture<DataFecFileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DataFecFileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DataFecFileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
