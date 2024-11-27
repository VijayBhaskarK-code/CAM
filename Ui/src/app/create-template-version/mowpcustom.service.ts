import { Injectable } from '@angular/core';
import {
  DynamicFormModel,
  DynamicFormArrayModel,
  DynamicFormArrayGroupModel,
  isString,
  DYNAMIC_FORM_CONTROL_TYPE_ARRAY,
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX,
  DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER,
  DynamicColorPickerModel,
  DynamicCheckboxGroupModel,
  DynamicDatePickerModel,
  DynamicEditorModel,
  DynamicFileUploadModel,
  DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA,
  DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER,
  DYNAMIC_FORM_CONTROL_TYPE_EDITOR,
  DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD,
  DYNAMIC_FORM_CONTROL_TYPE_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_INPUT,
  DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP,
  DYNAMIC_FORM_CONTROL_TYPE_RATING,
  DYNAMIC_FORM_CONTROL_TYPE_SELECT,
  DYNAMIC_FORM_CONTROL_TYPE_SLIDER,
  DYNAMIC_FORM_CONTROL_TYPE_SWITCH,
  DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER,
  DynamicTimePickerModel,
  DynamicTextAreaModel,
  DynamicSwitchModel,
  DynamicSliderModel,
  DynamicSelectModel,
  DynamicRatingModel,
  DynamicRadioGroupModel,
  DynamicInputModel,
  DynamicFormGroupModel,
  DynamicCheckboxModel,
  maskFromString,
  parseReviver,
  DynamicFormValidationService
} from '@ng-dynamic-forms/core';
import { ActivatedRoute } from '@angular/router';
// import { AppCalendarModel } from './calendar/calendar.model';
// import { AppAutoCompleteModel } from './app-autocomplete/app-auto.model';
// import { AppHintPanelModel } from './hintpanel/app.hintpanel.model';
// import { AppUplodaModel } from './app-upload/app-upload.model';
// import { AppTextareaModel } from './app-textarea/app-textarea.model';
// import { AppRadioGroupModel } from './app-radio-group/app.radio-group.model';
// import { AppRadioButtonModel } from './app-radiobutton/app-radibutton.model';
// import { AppTableModel, DYNAMIC_FORM_CONTROL_TYPE_APPTABLE } from './app-table/app-table.model';


@Injectable()
export class MowpCustomService {
  constructor(private route: ActivatedRoute, private vs: DynamicFormValidationService) {

  }

  public fromJSON(json: string | object[], teamType: number): any {
    const formModelJSON = isString(json) ? JSON.parse(json, parseReviver) : json,
      formModel: DynamicFormModel = [];
    // console.log('Json Model');
    // console.log(formModelJSON);
    formModelJSON.forEach((model: any) => {
      const layout = model.layout || null;
      switch (model.type) {
        case DYNAMIC_FORM_CONTROL_TYPE_ARRAY:
          const formArrayModel = model as DynamicFormArrayModel;

          if (Array.isArray(formArrayModel.groups)) {
            formArrayModel.groups.forEach(
              (groupModel: DynamicFormArrayGroupModel) => {
                groupModel.group = this.fromJSON(
                  groupModel.group,
                  teamType
                ) as DynamicFormModel;
              }
            );
            formArrayModel.groups.forEach(
              (groupModel: DynamicFormArrayGroupModel) => {
                groupModel.group = this.fromJSON(
                  groupModel.group,
                  teamType
                ) as DynamicFormModel;
              }
            );
          }

          formArrayModel.groupFactory = () => {
            return this.fromJSON(formArrayModel.groupPrototype, teamType);
          };

          formModel.push(new DynamicFormArrayModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX:
          formModel.push(new DynamicCheckboxModel(model, layout));
          break;

        // case DYNAMIC_FORM_CONTROL_TYPE_APPTABLE:
        //   formModel.push(new AppTableModel(model, layout));
        //   break;

        case DYNAMIC_FORM_CONTROL_TYPE_CHECKBOX_GROUP:
          model.group = this.fromJSON(
            model.group,
            teamType
          ) as DynamicCheckboxModel[];
          formModel.push(new DynamicCheckboxGroupModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_COLORPICKER:
          formModel.push(new DynamicColorPickerModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_DATEPICKER:
          formModel.push(new DynamicDatePickerModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_EDITOR:
          formModel.push(new DynamicEditorModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_FILE_UPLOAD:
          model.value = null;
          formModel.push(new DynamicFileUploadModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_GROUP:
          model.group = this.fromJSON(model.group, teamType);
          formModel.push(new DynamicFormGroupModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_INPUT:
          const inputModel : any = model as DynamicInputModel;

          if (inputModel.mask !== null) {
            if (!(inputModel.mask instanceof Function)) {
              inputModel.mask = maskFromString(inputModel.mask as string);
            }
          }

          formModel.push(new DynamicInputModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_RADIO_GROUP:
          formModel.push(new DynamicRadioGroupModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_RATING:
          formModel.push(new DynamicRatingModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_SELECT:
          formModel.push(new DynamicSelectModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_SLIDER:
          formModel.push(new DynamicSliderModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_SWITCH:
          formModel.push(new DynamicSwitchModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_TEXTAREA:
          formModel.push(new DynamicTextAreaModel(model, layout));
          break;

        case DYNAMIC_FORM_CONTROL_TYPE_TIMEPICKER:
          formModel.push(new DynamicTimePickerModel(model, layout));
          break;

        // case 'APPCALENDAR':
        //   formModel.push(new AppCalendarModel(model, layout));
        //   break;

        // case 'APPAUTOCOMPLETE':
        //   formModel.push(new AppAutoCompleteModel(model, layout));
        //   break;

        // case 'HINTPANEL':
        //   formModel.push(new AppHintPanelModel(model, layout));
        //   break;

        // case 'FILEUPLOAD':
        //   formModel.push(new AppUplodaModel(model, layout));
        //   break;

        // case 'APPTEXTAREA':
        //   formModel.push(new AppTextareaModel(model, layout));
        //   break;
        // case 'APPRADIOBUTTON':
        //   formModel.push(new AppRadioButtonModel(model, layout));
        //   break;
        // case 'APPRADIOGROUP':
        //   formModel.push(new AppRadioGroupModel(model, layout));
        //   break;
        default:
          throw new Error(
            `unknown form control model type defined on JSON object with id '${
            model.id
            }'`
          );
      }
    });
    return formModel;
  }
}
