import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IoGraphComponent } from './io-graph.component';

describe('IoGraphComponent', () => {
  let component: IoGraphComponent;
  let fixture: ComponentFixture<IoGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IoGraphComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IoGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
