import { PluginLog } from "./plugin-log.model";

export class Plugin {

    constructor(){
        this.pluginLogs = new Array<PluginLog>();    
    }

    pluginId: number;
    pluginName: string;
    manualMinutes: number;
    automatedMinutes: number;
    description: string;
    departmentId: number;
    departmentName: string;
    pluginLogs: Array<PluginLog>;
    pluginToken : string
    createdBy: number;
    createdDate: Date;
    lastModifiedBy: number;
    lastModifiedDate: Date;
}
