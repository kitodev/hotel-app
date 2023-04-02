import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HotelListComponent } from './hotel-list.component';
import { HotelListRoutingModule } from './hotel-list-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [HotelListComponent],
  imports: [
    CommonModule,
    SharedModule,
    HotelListRoutingModule,
  ],
})
export class HotelListModule {}
