import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../application/Validator/CustomValidator.component';
import { PluginService } from '../../application/services/plugin-services/plugin-base.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Plugin } from '../../domain/model/plugin.model';
import { Department } from '../../domain/model/department.model';
import { DepartmentService } from '../../application/services/admin-services/department.service';
import { AlertifyService } from '../../application/services/common-services/alertify.service';
import { AuthService } from '../../application/services/common-services/auth.service';

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
  _department: Array<Department>;

  constructor(
    @Inject(MAT_DIALOG_DATA) public _editData: Plugin,
    private _pluginFrmDialog: MatDialogRef<PluginUpsertComponent>,
    private _fb: FormBuilder,
    private _service: PluginService,
    private _depService: DepartmentService,
    private _alertify: AlertifyService,
    private readonly _authService: AuthService) {
    this._pluginModel = new Plugin();
  }


  ngOnInit() {
    console.log("Called");
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
    console.log("Called");

    this._pluginModel.createdBy = this._authService.getEmployeeIdFromToken();
    console.log(this._pluginModel);
    this._service.add(this._pluginModel).subscribe({
      next: (val: Plugin) => {
        this._alertify.success("Plugin added successfully!");
      }
    })
  }

  update() {

    this._pluginModel.lastModifiedBy = this._authService.getEmployeeIdFromToken();

    console.log("Called");

    console.log(this._pluginModel);

    this._pluginModel.pluginId = this._editData.pluginId;

    this._service.update(this._editData.pluginId, this._pluginModel).subscribe({
      next: (val: Plugin) => {
        this._alertify.success("Plugin updated successfully!");
      }
    })
  }

  mapProject(): void {

    this._pluginModel.pluginName = this.pluginName.value;
    this._pluginModel.manualMinutes = this.manualMinutes.value;
    this._pluginModel.automatedMinutes = this.automatedMinutes.value;
    this._pluginModel.description = this.description.value;
    this._pluginModel.departmentId = this.departmentName.value;
  }
}
