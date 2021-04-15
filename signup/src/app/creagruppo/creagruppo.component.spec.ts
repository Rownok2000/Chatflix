import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreagruppoComponent } from './creagruppo.component';

describe('CreagruppoComponent', () => {
  let component: CreagruppoComponent;
  let fixture: ComponentFixture<CreagruppoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreagruppoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreagruppoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
