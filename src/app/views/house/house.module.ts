import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HouseComponent } from './house.component';
import { HouseRoutingModule } from './house-routing.module';
import { AlertModule, AvatarModule, BadgeComponent, BadgeModule, ButtonModule, CardModule, DropdownModule, FormModule, GridModule, ModalComponent, ModalModule, ProgressModule, SharedModule, TableModule, WidgetModule } from '@coreui/angular';
import { WidgetsModule } from '../widgets/widgets.module';
import { IconModule } from '@coreui/icons-angular';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { DocsComponentsModule } from '@docs-components/docs-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';




@NgModule({
  declarations: [HouseComponent],
  imports: [
    CommonModule,    
    HouseRoutingModule,
    GridModule,
    AvatarModule,
    TableModule,
    ProgressModule,
    WidgetsModule,
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
    BadgeModule
  ]
})
export class HouseModule { }
