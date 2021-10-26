import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowReportsDetailsComponent } from './show-reports-details.component';

describe('ShowReportsDetailsComponent', () => {
  let component: ShowReportsDetailsComponent;
  let fixture: ComponentFixture<ShowReportsDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowReportsDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowReportsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
