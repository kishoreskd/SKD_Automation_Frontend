import { PluginLog } from "./plugin-log.model";

export class Plugin {
    pluginId: number;
    pluginName: string;
    manualMinutes: string;
    automatedMinutes: string;
    description: string;
    departmentId: number;
    departmentName: string;
    pluginLogs?: Array<PluginLog>;
    createdEmployeeId: number;
    lastModifiedEmployeeId: number;
    createdDate: Date;
}
