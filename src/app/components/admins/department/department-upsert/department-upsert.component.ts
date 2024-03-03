import { Component, Inject, OnInit } from '@angular/core';
import { Department } from '../../../../domain/model/department.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AlertifyService } from '../../../../application/services/common-services/alertify.service';
import { AuthService } from '../../../../application/services/common-services/auth.service';
import { DepartmentService } from '../../../../application/services/admin-services/department.service';

@Component({
  selector: 'app-department-upsert',
  templateUrl: './department-upsert.component.html',
  styleUrls: ['./department-upsert.component.css']
})
export class DepartmentUpsertComponent implements OnInit {

  department: Department = new Department();
  registerFrm: FormGroup;
  departmentId: number;
  action: string = "Save";

  constructor(@Inject(MAT_DIALOG_DATA) public _dialogData: Department,
    private _fb: FormBuilder,
    private readonly _alertify: AlertifyService,
    private _userDialog: MatDialogRef<Department>,
    private readonly _authService: AuthService,
    private readonly _departmentService: DepartmentService) { }

  ngOnInit() {
    this.createForm();
    this.patchObj();
  }


  get departmentName(): FormControl {
    return this.getControl("departmentName");
  }

  getControl(field: string): FormControl {
    return this.registerFrm.get(field) as FormControl;
  }

  createForm() {
    this.registerFrm = this._fb.group({
      departmentName: [null, [Validators.required]]
    });
  }

  patchObj() {
    if (this._dialogData.departmentId !== 0) {
      this.action = "Update";
      this.registerFrm.patchValue(this._dialogData);
    }
  }

  onFrmSubmit() {

    if (this.registerFrm.valid) {
      
      this.map();
      if (this._dialogData.departmentId === 0) {
        this.add();
      } else {
        this.update();
      }
      this._userDialog.close(true);
    }
  }

  add() {
    console.log(this.department);

    this._departmentService.add(this.department).subscribe((data: Department) => {
      this._alertify.success("Department added successfully!");
    })
  }

  update() {

    this.department.departmentId = this._dialogData.departmentId;

    this._departmentService.update(this._dialogData.departmentId, this.department).subscribe((data: Department) => {
      this._alertify.success("Department updated successfully!");
    })
  }

  map() {
    this.department.departmentName = this.departmentName.value;
  }

}
