import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseComponent } from './house.component';
import { HouseRoutingModule } from './house-routing.module';
import { AccordionModule, AlertModule, AvatarModule, BadgeComponent, BadgeModule, ButtonModule, CardModule, DropdownModule, FormModule, GridModule, ModalComponent, ModalModule, ProgressModule, SharedModule, TableModule, TooltipModule, WidgetModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateHouseComponent } from './create-house/create-house.component';
import { CreateTenantComponent } from './create-tenant/create-tenant.component';




@NgModule({
  declarations: [HouseComponent, CreateHouseComponent, CreateTenantComponent],
  imports: [
    CommonModule,    
    HouseRoutingModule,
    GridModule,
    AvatarModule,
    TableModule,
    ProgressModule,    
    IconModule,
    CardModule,
    ButtonModule,
    WidgetModule,
    DropdownModule,
    ChartjsModule,
    ProgressModule,
    DocsComponentsModule,
    SharedModule,
    ModalModule,
    FormsModule,
    FormModule,
    ReactiveFormsModule,
    AlertModule,
    BadgeModule,
    AccordionModule,
    TooltipModule
  ]
})
export class HouseModule { }
