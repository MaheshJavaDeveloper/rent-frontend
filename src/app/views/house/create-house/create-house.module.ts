import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccordionModule, BadgeModule, FormModule, GridModule } from '@coreui/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccordionModule,
    FormModule,
    FormsModule,
    ReactiveFormsModule,
    GridModule,
    BadgeModule
  ]
})
export class CreateHouseModule { }
