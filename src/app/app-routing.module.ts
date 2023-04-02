import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'hotel-list',
    loadChildren: () =>
      import('./components/hotel/hotel-list/hotel-list.module').then(
        (m) => m.HotelListModule
      ),
  },
  {
    path: 'edit-hotel',
    loadChildren: () =>
      import('./components/hotel/edit-hotel/edit-hotel.module').then(
        (m) => m.EditHotelModule
      ),
  },
  {
    path: '',
    redirectTo: '/hotel-list',
    pathMatch: 'full',
  },
  { path: '**', redirectTo: '/hotel-list', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
