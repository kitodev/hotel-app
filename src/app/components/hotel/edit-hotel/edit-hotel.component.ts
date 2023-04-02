import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HotelService } from 'src/app/services/hotel.service';
import { DialogData } from 'src/app/shared/models/dialog.model';

@Component({
  selector: 'app-edit-hotel',
  templateUrl: './edit-hotel.component.html',
  styleUrls: ['./edit-hotel.component.scss'],
})
export class EditHotelComponent implements OnInit {
  formHotel!: FormGroup;
  errors!: HttpErrorResponse;
  title!: string;

  constructor(
    private fb: FormBuilder,
    private hotelService: HotelService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private dialogRef: MatDialogRef<EditHotelComponent>
  ) {}

  ngOnInit(): void {
    this.hotelForm();
    this.formHotel.patchValue(this.data);
  }

  cancelRegistration() {
    this.dialogRef.close();
  }

  private hotelForm() {
    this.formHotel = this.fb.group({
      id: ['', []],
      name: ['', []],
      avatar: ['', []],
      createdAt: ['', []],
      price: ['',
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      seasonal_open_from: ['', [Validators.required]],
      seasonal_open_to: ['', [Validators.required]],
    });
  }

  editHotel() {
    if (this.formHotel.valid) {
      if (this.data) {
        this.hotelService
          .updateHotel(this.data.id, this.formHotel.value)
          .subscribe({
            next: () => {
              this.openSnackBar('Hotel updated!', 'OK');
              this.dialogRef.close(true);
            },
            error: (err: HttpErrorResponse) => {
              this.errors = err;
            },
          });
      }
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action);
  }
}
