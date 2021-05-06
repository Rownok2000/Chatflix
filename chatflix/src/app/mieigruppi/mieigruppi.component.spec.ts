import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MieigruppiComponent } from './mieigruppi.component';

describe('MieigruppiComponent', () => {
  let component: MieigruppiComponent;
  let fixture: ComponentFixture<MieigruppiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MieigruppiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MieigruppiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
