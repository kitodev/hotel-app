import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatTableModule } from '@angular/material/table';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HotelListComponent } from './hotel-list.component';

describe('HotelListComponent', () => {
  let component: HotelListComponent;
  let fixture: ComponentFixture<HotelListComponent>;
  let loader: HarnessLoader;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let instance: HotelListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
         HttpClientTestingModule,
         MatDialogModule,
         NoopAnimationsModule,
         MatTableModule,
         MatPaginatorModule
      ],
      providers: [
        MatSnackBar
      ],
      declarations: [HotelListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HotelListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    loader = TestbedHarnessEnvironment.loader(fixture);
    instance = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

   it('should load all paginator harnesses', async () => {
     const paginators = await loader.getAllHarnesses(MatPaginatorHarness);
     expect(paginators.length).toBe(1);
   });

});
