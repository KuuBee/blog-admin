import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationCreateComponent } from './create.component';

describe('CreateComponent', () => {
  let component: ClassificationCreateComponent;
  let fixture: ComponentFixture<ClassificationCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
