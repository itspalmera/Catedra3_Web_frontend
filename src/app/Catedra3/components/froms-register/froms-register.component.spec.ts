import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FromsRegisterComponent } from './froms-register.component';

describe('FromsRegisterComponent', () => {
  let component: FromsRegisterComponent;
  let fixture: ComponentFixture<FromsRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FromsRegisterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FromsRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
