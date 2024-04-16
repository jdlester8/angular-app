import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketCaptureComponent } from './packet-capture.component';

describe('PacketCaptureComponent', () => {
  let component: PacketCaptureComponent;
  let fixture: ComponentFixture<PacketCaptureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacketCaptureComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacketCaptureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
