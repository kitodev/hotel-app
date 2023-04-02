import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditHotelComponent } from './edit-hotel.component';
import { EditHotelRoutingModule } from './edit-hotel-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [EditHotelComponent],
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule,
    EditHotelRoutingModule,
  ],
})
export class EditHotelModule {}
