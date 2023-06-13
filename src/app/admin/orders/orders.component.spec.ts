import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrdersComponent } from './orders.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';

fdescribe('OrdersComponent', () => {
  let component: OrdersComponent;
  let fixture: ComponentFixture<OrdersComponent>;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrdersComponent],
      imports: [AngularFireModule.initializeApp(environment.firebase), MatDialogModule]
    })
      .compileComponents();

    fixture = TestBed.createComponent(OrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have initial value for isLoading true', () => {
    expect(component.isLoading).toEqual(true);
  });

  it('should have initial value for isLoading false after having all the data', () => {
    component.getAllOrdersOfAllUsers();
    fixture.detectChanges();
    expect(component.isLoading).toBe(false);
  });
});
