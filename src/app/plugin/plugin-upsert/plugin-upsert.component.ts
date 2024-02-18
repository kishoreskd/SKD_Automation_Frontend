import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../application/Validator/CustomValidator.component';
import { PluginService } from '../../services/plugin-services/plugin.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plugin } from '../../domain/model/plugin.model';
import { Department } from '../../domain/model/department';

@Component({
  selector: 'app-plugin-upsert',
  templateUrl: './plugin-upsert.component.html',
  styleUrls: ['./plugin-upsert.component.css']
})
export class PluginUpsertComponent implements OnInit {

  _pluginModel: Plugin;
  _pluginFrm: FormGroup;
  _action: string = "Save";
  _pluginId: number;

  _department: Array<Department> = [
    { departmentId: 1, departmentName: "STEEL" },
    { departmentId: 2, departmentName: "CONCRETE" },
    { departmentId: 3, departmentName: "REVIT" },
    { departmentId: 4, departmentName: "AUTO CAD" },
    { departmentId: 5, departmentName: "SDS2" }
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA) public _editData: Plugin,
    private _pluginFrmDialog: MatDialogRef<PluginUpsertComponent>,
    private _fb: FormBuilder,
    private _service: PluginService) {
    this._pluginModel = new Plugin();
  }

  ngOnInit() {
    this.createForm();
    this.patchObj();
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

  patchObj() {
    if (this._editData) {
      this._action = "Update"
      this._pluginFrm.patchValue(this._editData);
      this.departmentName.setValue(this._editData.departmentId);
      this._pluginId = this._editData.pluginId;
    }
  }

  onFormSubmit() {

    if (this._pluginFrm.valid) {

      this._pluginFrmDialog.close({ msg: "Loaded", isValid: true });

      this.mapProject();

      if (!this._editData) {
        this.add();
      } else {
        this.update();
      }
    }
  }

  add() {
    this._pluginModel.createdEmployeeId = 2701;

    this._service.add(this._pluginModel).subscribe({
      next: (val: Plugin) => {
        alert('Plugin added!')
      }
    })
  }

  update() {
    this._pluginModel.pluginId = this._editData.pluginId;
    this._service.update(this._editData.pluginId, this._pluginModel).subscribe({
      next: (val: Plugin) => {
        alert('Updated!')
      }
    })
  }

  mapProject(): void {

    this._pluginModel.pluginName = this.pluginName.value;
    this._pluginModel.manualMinutes = this.manualMinutes.value;
    this._pluginModel.automatedMinutes = this.automatedMinutes.value;
    this._pluginModel.description = this.description.value;
    this._pluginModel.departmentName = "";
    this._pluginModel.departmentId = this.departmentName.value;
  }
}
