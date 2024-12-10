import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Type, DEFAULT_CURRENCY_CODE, InjectionToken } from '@angular/core';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { FormsModule, ReactiveFormsModule, NG_VALIDATORS, Validator, NG_ASYNC_VALIDATORS } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ButtonModule } from "primeng/button";
import { CalendarModule } from "primeng/calendar";
import { DropdownModule } from "primeng/dropdown";
import { CheckboxModule } from "primeng/checkbox";
import { AutoCompleteModule } from "primeng/autocomplete";
import { ConfirmDialogModule } from "primeng/confirmdialog";
import { ConfirmationService } from "primeng/api";
import { TabMenuModule } from "primeng/tabmenu";
import { FileUploadModule } from "primeng/fileupload";
import { RadioButtonModule } from "primeng/radiobutton";
import { TreeModule } from 'primeng/tree';
import { TabViewModule } from 'primeng/tabview';
import { TieredMenuModule } from 'primeng/tieredmenu';

import { HttpClientModule } from '@angular/common/http';

import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { DYNAMIC_FORM_CONTROL_MAP_FN, DynamicFormControlModel, DynamicFormControl, DynamicFormsCoreModule, DYNAMIC_VALIDATORS, ValidatorFactory, DISABLED_MATCHER_PROVIDER, REQUIRED_MATCHER_PROVIDER } from '@ng-dynamic-forms/core';

import {
  DynamicPrimeNGAutoCompleteComponent,
  DynamicPrimeNGCalendarComponent,
  DynamicPrimeNGCheckboxComponent,
  DynamicPrimeNGChipsComponent,
  DynamicPrimeNGColorPickerComponent,
  DynamicPrimeNGDropdownComponent,
  DynamicPrimeNGEditorComponent,
  DynamicPrimeNGFormArrayComponent,
  DynamicPrimeNGFormComponent,
  DynamicPrimeNGFormControlContainerComponent,
  DynamicPrimeNGFormGroupComponent,
  DynamicPrimeNGInputComponent,
  DynamicPrimeNGInputMaskComponent,
  DynamicPrimeNGInputSwitchComponent,
  DynamicPrimeNGMultiSelectComponent,
  DynamicPrimeNGRadioGroupComponent,
  DynamicPrimeNGRatingComponent,
  DynamicPrimeNGSliderComponent,
  DynamicPrimeNGSpinnerComponent,
  DynamicPrimeNGTextAreaComponent
} from '@ng-dynamic-forms/ui-primeng';

import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RadioButtonModule,
    FileUploadModule,
    HttpClientModule,
    AngularSvgIconModule.forRoot(),
    BrowserModule,
    BrowserAnimationsModule,
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    DynamicFormsCoreModule,
    DynamicPrimeNGAutoCompleteComponent,
    DynamicPrimeNGCalendarComponent,
    DynamicPrimeNGCheckboxComponent,
    DynamicPrimeNGChipsComponent,
    DynamicPrimeNGColorPickerComponent,
    DynamicPrimeNGDropdownComponent,
    DynamicPrimeNGEditorComponent,
    DynamicPrimeNGFormArrayComponent,
    DynamicPrimeNGFormComponent,
    DynamicPrimeNGFormControlContainerComponent,
    DynamicPrimeNGFormGroupComponent,
    DynamicPrimeNGInputComponent,
    DynamicPrimeNGInputMaskComponent,
    DynamicPrimeNGInputSwitchComponent,
    DynamicPrimeNGMultiSelectComponent,
    DynamicPrimeNGRadioGroupComponent,
    DynamicPrimeNGRatingComponent,
    DynamicPrimeNGSliderComponent,
    DynamicPrimeNGSpinnerComponent,
    DynamicPrimeNGTextAreaComponent,
    CalendarModule,
    CheckboxModule,
    TableModule,
    DropdownModule,
    AutoCompleteModule,
    TreeModule,
    TieredMenuModule,
    TabViewModule,
    //DashboardModule,
    AppRoutingModule,
    ConfirmDialogModule,
    TabMenuModule,
    NgIdleKeepaliveModule.forRoot(),
    DialogModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
