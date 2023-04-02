import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router'
import { HotelListComponent } from './hotel-list.component';

const routes: Routes = [
  {
    path: '',
    component: HotelListComponent,
  },
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
})
export class HotelListRoutingModule {}
