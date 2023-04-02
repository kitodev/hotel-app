import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { EditHotelComponent } from './edit-hotel.component';

const routes: Routes = [
  {
    path: '',
    component: EditHotelComponent,
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class EditHotelRoutingModule {}
