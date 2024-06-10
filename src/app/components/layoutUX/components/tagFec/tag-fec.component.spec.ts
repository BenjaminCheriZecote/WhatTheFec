import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TagFecComponent } from './tag-fec.component';

describe('DataFecFileComponent', () => {
  let component: TagFecComponent;
  let fixture: ComponentFixture<TagFecComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TagFecComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TagFecComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
