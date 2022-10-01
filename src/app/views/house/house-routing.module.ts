import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HouseComponent } from './house.component';
import { CreateHouseComponent } from './create-house/create-house.component';
import { CreateTenantComponent } from './create-tenant/create-tenant.component';
import { AuthguardGuard } from '../../service/authguard/authguard.guard';

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
      },
      {
        path: 'create-house',
        component: CreateHouseComponent,
        data: {
          title: 'Create House'
        }
      },
      {
        path: 'create-tenant',
        component: CreateTenantComponent,
        data: {
          title: 'Create Tenant'
        },
      }
    ],
    canActivate: [AuthguardGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HouseRoutingModule {
}
