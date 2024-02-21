import { PluginLog } from "./plugin-log.model";

export class Plugin {
    pluginId: number;
    pluginName: string;
    manualMinutes: number;
    automatedMinutes: number;
    description: string;
    departmentId: number;
    departmentName: string;
    pluginLogs?: Array<PluginLog>;

    createdBy: number;
    createdDate: Date;
    lastModifiedBy: number;
    lastModifiedDate: Date;
}
