import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PluginLog } from '../../domain/model/plugin-log.model';
import { Plugin } from '../../domain/model/plugin.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { KeyService } from '../../application/services/key.service';
import { ApiToken } from '../../domain/model/ApiToken.model';

@Component({
  selector: 'app-plugin-key',
  templateUrl: './plugin-key.component.html',
  styleUrls: ['./plugin-key.component.css']
})
export class PluginKeyComponent implements OnInit {

  frm: FormGroup;
  pluginuId: number;
  token: string;

  constructor(@Inject(MAT_DIALOG_DATA) public _dialogData: Plugin,
    private _fb: FormBuilder,
    private readonly _keyService: KeyService) { }

  ngOnInit() {
    this.createFrm();
    this.pluginuId = this._dialogData.pluginId;
    this.generateKey();
  }

  createFrm() {
    this.frm = this._fb.group({
      key: ['', [Validators.required]]
    });
  }

  generateKey() {
    if (this.pluginuId > 0) {
      this._keyService.generateToken(this.pluginuId).subscribe((token: ApiToken) => {
        this.token = token.accessToken;
        this.frm.get("key").setValue(this.token);
      });

    }
  }
}
