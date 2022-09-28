import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseComponent } from './house.component'

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'House'
    },
    children: [   
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'house'
      },  
      {
        path: 'house',
        component: HouseComponent,
        data: {
          title: 'Houses'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule {
}
