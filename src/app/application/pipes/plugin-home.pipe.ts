import { Pipe, PipeTransform } from '@angular/core';
import { Plugin } from '../../domain/model/plugin.model';

@Pipe({
  name: 'pluginHomeFilter '
})
export class PluginHomePipe implements PipeTransform {

  transform(source: Plugin[], filterType: any, filterText: string): any {
    console.log("pipe");
    return null;
  }

}
