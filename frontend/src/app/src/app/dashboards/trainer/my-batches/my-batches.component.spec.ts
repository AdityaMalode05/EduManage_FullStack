import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBatchesComponent } from './my-batches.component';

describe('MyBatchesComponent', () => {
  let component: MyBatchesComponent;
  let fixture: ComponentFixture<MyBatchesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MyBatchesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyBatchesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
