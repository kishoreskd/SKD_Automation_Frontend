import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'app-permission-master',
  templateUrl: './permission-master.component.html',
  styleUrls: ['./permission-master.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PermissionMasterComponent {

  modules: string[] = ['CREATE', 'UPDATE', 'VIEW', 'DELETE']


}
