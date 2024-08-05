import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PacketSnifferComponent } from './packet-sniffer.component';

describe('MathComponent', () => {
  let component: PacketSnifferComponent;
  let fixture: ComponentFixture<PacketSnifferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PacketSnifferComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PacketSnifferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
