import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../application/Validator/CustomValidator.component';
import { PluginService } from '../../services/plugin.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Plugin } from '../../domain/model/plugin-log.model';

@Component({
  selector: 'app-plugin-upsert',
  templateUrl: './plugin-upsert.component.html',
  styleUrls: ['./plugin-upsert.component.css']
})
export class PluginUpsertComponent implements OnInit {

  _pluginModel: Plugin;
  _pluginFrm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public _data: Plugin, private _fb: FormBuilder, private _service: PluginService) {
    this._pluginModel = new Plugin();
  }

  ngOnInit() {
    this.createForm();
    this._pluginFrm.patchValue(this._data)
  }

  createForm() {
    this._pluginFrm = this._fb.group({
      pluginName: [null, Validators.required],
      manualMinutes: [null, [Validators.required, CustomValidator.numeric]],
      automatedMinutes: [null, [Validators.required, CustomValidator.numeric]],
      description: [null, [Validators.required]],
      departmentName: [null, [Validators.required,]]
    });
  }

  //#region Get Form Control
  get pluginName(): FormControl {
    return this.getControl("pluginName");
  }
  get manualMinutes(): FormControl {
    return this.getControl("manualMinutes");
  }
  get automatedMinutes(): FormControl {
    return this.getControl("automatedMinutes");
  }
  get description(): FormControl {
    return this.getControl("description");
  }
  get departmentName(): FormControl {
    return this.getControl("departmentName");
  }

  getControl(field: string): FormControl {
    return this._pluginFrm.get(field) as FormControl;
  }
  //#endregion

  onFormSubmit() {


    if (this._pluginFrm.valid) {
      this.mapProject();
      this._service.add(this._pluginModel).subscribe({
        next: (val: Plugin) => {
          alert('Plugin added!')
        },
        error: (err: any) => {
          console.log(err);
        }
      })
    }
  }

  mapProject(): void {
    this._pluginModel.pluginName = this.pluginName.value;
    this._pluginModel.manualMinutes = this.manualMinutes.value;
    this._pluginModel.automatedMinutes = this.automatedMinutes.value;
    this._pluginModel.description = this.description.value;
    this._pluginModel.departmentName = this.departmentName.value;
    this._pluginModel.departmentId = 2;
  }
}
