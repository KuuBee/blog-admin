import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassificationIndexComponent } from './index.component';

describe('IndexComponent', () => {
  let component: ClassificationIndexComponent;
  let fixture: ComponentFixture<ClassificationIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassificationIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassificationIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
