import { PluginLog } from "./plugin.model";

export class Plugin {
    pluginId: number;
    pluginName: string;
    manualMinutes: string;
    automatedMinutes: string;
    description: string;
    createdEmployeeId: number;
    createdDate: Date;
    departmentId: number;
    departmentName: string;
    pluginLogs?: Array<PluginLog>;
}
