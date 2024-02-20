import { Component, Inject, OnInit } from '@angular/core';
import { PluginLog } from '../../domain/model/plugin-log.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from '../../services/common/alertify.service';
import { PluginService } from '../../services/plugin-services/plugin.service';
import { PluginLogService } from '../../services/plugin-services/plugin-log.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-plugin-log-upsert',
  templateUrl: './plugin-log-upsert.component.html',
  styleUrls: ['./plugin-log-upsert.component.css']
})
export class PluginLogUpsertComponent implements OnInit {

  _pluginLogModel: PluginLog;
  _pluginLogFrm: FormGroup;
  _action: string = "Save";
  _pluginId: number;

  constructor(@Inject(MAT_DIALOG_DATA) public _dialogData: PluginLog,
    private _pluginLogFrmDialog: MatDialogRef<PluginLogUpsertComponent>,
    private _fb: FormBuilder,
    private _service: PluginLogService,
    private _alertify: AlertifyService) {
    this._pluginLogModel = new PluginLog();
  }

  ngOnInit() {
    this.createForm();
    this.patchObj();
  }

  //#region Get Form Control
  get jobName(): FormControl {
    return this.getControl("jobName");
  }
  get activity(): FormControl {
    return this.getControl("activity");
  }

  getControl(field: string): FormControl {
    return this._pluginLogFrm.get(field) as FormControl;
  }
  //#endregion

  createForm() {
    this._pluginLogFrm = this._fb.group({
      jobName: [null, Validators.required],
      activity: [null, Validators.required],
    });
  }

  patchObj() {
    if (this._dialogData) {
      this._action = "Update";
      this._pluginLogFrm.patchValue(this._dialogData);
    }
  }

  onFormSubmit() {



    if (this._pluginLogFrm.valid) {

      this.mapProject();


      if (this._dialogData.pluginLogId === 0) {
        this.add();
      } else {
        this.update();
      }
      
      this._pluginLogFrmDialog.close({ msg: "Loaded", isValid: true });
    }
  }

  add() {
    this._pluginLogModel.createdBy = 2701;

    this._service.add(this._pluginLogModel).subscribe({
      next: (val: PluginLog) => {
        this._alertify.success("Log added successfully!");
      }
    })
  }

  update() {

    this._pluginLogModel.pluginLogId = this._dialogData.pluginLogId;
    this._pluginLogModel.lastModifiedBy = 2701;

    this._service.update(this._dialogData.pluginLogId, this._pluginLogModel).subscribe({
      next: (val: PluginLog) => {
        this._alertify.success("Log updated successfully!");
      }
    })
  }

  mapProject(): void {
    this._pluginLogModel.jobName = this.jobName.value;
    this._pluginLogModel.activity = this.activity.value;
    this._pluginLogModel.pluginId = this._dialogData.pluginId;
  }
}
