import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PluginLog } from '../../domain/model/plugin-log.model';
import { Plugin } from '../../domain/model/plugin.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-plugin-key',
  templateUrl: './plugin-key.component.html',
  styleUrls: ['./plugin-key.component.css']
})
export class PluginKeyComponent implements OnInit {

  frm: FormGroup;

  constructor(@Inject(MAT_DIALOG_DATA) public _dialogData: Plugin,
    private _fb: FormBuilder) { }

  ngOnInit() {
    this.createFrm();
    console.log(this._dialogData.pluginToken);
    this.frm.get("key").setValue(this._dialogData.pluginToken);
  }

  createFrm() {
    this.frm = this._fb.group({
      key: ['', [Validators.required]]
    });
  }


}
