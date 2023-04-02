import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { HotelService } from 'src/app/services/hotel.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Hotel } from 'src/app/shared/models/hotel.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditHotelComponent } from '../edit-hotel/edit-hotel.component';
import { FormGroup } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.scss'],
})
export class HotelListComponent implements OnInit, OnDestroy {
  hotels!: Hotel;
  form!: FormGroup;
  errors!: HttpErrorResponse;
  length = 1000;
  pageSize = 10;
  pageIndex = 0;
  pageSizeOptions = [5, 10, 25, 100, 500, 1000];

  displayedColumns: string[] = [
    'name',
    'avatar',
    'seasonal_open_from',
    'seasonal_open_to',
    'createdAt',
    'price',
    'action',
  ];
  dataSource!: MatTableDataSource<Hotel>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private unsubscribe = new Subject<void>();

  constructor(
    private hotelService: HotelService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getAllHotels();
  }

  updateHotel(row: number) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = row;
    dialogConfig.data.title = 'Update hotel';
    dialogConfig.data.buttonName = 'Update';
    const dialogRef = this.dialog.open(EditHotelComponent, dialogConfig);

    dialogRef
      .afterClosed()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          this.getAllHotels();
        },
        error: (err: HttpErrorResponse) => {
          this.errors = err;
        },
      });
  }

  getAllHotels() {
    this.hotelService
      .getHotels()
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: (res: Hotel[]) => {
          this.dataSource = new MatTableDataSource(res);
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
         error: (err: HttpErrorResponse) => {
          this.errors = err;
        },
      });
  }

  deleteHotel(row: number) {
    this.hotelService
      .deleteHotel(row)
      .pipe(takeUntil(this.unsubscribe))
      .subscribe({
        next: () => {
          this.openSnackBar('Hotel deleted!', 'done');
          this.getAllHotels();
        },
        error: (err: HttpErrorResponse) => {
          this.errors = err;
        },
      });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }

  ngOnDestroy(): void {
    this.unsubscribe.next();
    this.unsubscribe.complete();
  }
}
