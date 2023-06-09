import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageNotFoundComponent } from './page-not-found.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { FormsModule } from '@angular/forms';

fdescribe('PageNotFoundComponent', () => {
  let component: PageNotFoundComponent;
  let fixture: ComponentFixture<PageNotFoundComponent>;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PageNotFoundComponent],
      imports: [AngularFireModule.initializeApp(environment.firebase), FormsModule],
    })
      .compileComponents();

    fixture = TestBed.createComponent(PageNotFoundComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have as status "404"', () => {
    expect(compiled.querySelector('h1')?.textContent).toContain('404');
  });

  it('should have as error message "Page Not Found"', () => {
    expect(compiled.querySelector('h3')?.textContent).toContain('Page Not Found');
  });

  it('should have status variable value as "404"', () => {
    expect(component.status).toEqual('404');
  });

  it('should have errorMessage variable value as "Page Not Found"', () => {
    expect(component.errorMessage).toEqual('Page Not Found');
  });
});
