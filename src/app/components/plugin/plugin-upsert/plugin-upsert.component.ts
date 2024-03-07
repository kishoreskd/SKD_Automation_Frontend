import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../../application/Validator/CustomValidator.component';
import { PluginService } from '../../../application/services/plugin-services/plugin-base.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plugin } from '../../../domain/model/plugin.model';
import { Department } from '../../../domain/model/department.model';
import { DepartmentService } from '../../../application/services/admin-services/department.service';
import { AlertifyService } from '../../../application/services/common-services/alertify.service';
import { AuthService } from '../../../application/services/common-services/auth.service';
import { AccessPermissionService } from '../../../application/services/common-services/accessPermission.service';

@Component({
  selector: 'app-plugin-upsert',
  templateUrl: './plugin-upsert.component.html',
  styleUrls: ['./plugin-upsert.component.css']
})
export class PluginUpsertComponent implements OnInit {

  plugin: Plugin;
  _pluginFrm: FormGroup;
  _action: string = "Save";
  _pluginId: number;
  _department: Array<Department>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _editData: Plugin,
    private _pluginFrmDialog: MatDialogRef<PluginUpsertComponent>,
    private _fb: FormBuilder,
    private _service: PluginService,
    private _depService: DepartmentService,
    private _alertify: AlertifyService,
    private readonly _authService: AuthService) {
    this.plugin = new Plugin();
  }


  ngOnInit() {
    this.createForm();
    this.patchObj();
    this.loadDepartment();
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

  createForm() {
    this._pluginFrm = this._fb.group({
      pluginName: [null, Validators.required],
      manualMinutes: [null, [Validators.required, CustomValidator.numeric]],
      automatedMinutes: [null, [Validators.required, CustomValidator.numeric]],
      description: [null, [Validators.required]],
      departmentName: [null, [Validators.required,]]
    });
  }

  loadDepartment(): void {
    this._depService.getAll().subscribe((data: Department[]) => {
      this._department = data;
    })
  }

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
      this.mapProject();
      if (!this._editData) this.add();
      else this.update();
      this._pluginFrmDialog.close(true);
    }
  }

  add() {
    this.plugin.createdBy = this._authService.getEmployeeIdFromToken();
    this._service.add(this.plugin).subscribe({
      next: (val: Plugin) => {
        this._alertify.success("Plugin added successfully!");
      }
    })
  }

  update() {
    this.plugin.lastModifiedBy = this._authService.getEmployeeIdFromToken();
    this.plugin.pluginId = this._editData.pluginId;

    this._service.update(this._editData.pluginId, this.plugin).subscribe({
      next: (val: Plugin) => {
        this._alertify.success("Plugin updated successfully!");
      }
    })
  }

  mapProject(): void {
    this.plugin.pluginName = this.pluginName.value;
    this.plugin.manualMinutes = this.manualMinutes.value;
    this.plugin.automatedMinutes = this.automatedMinutes.value;
    this.plugin.description = this.description.value;
    this.plugin.departmentId = this.departmentName.value;
  }
}
