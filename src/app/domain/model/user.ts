export class User {
    id: number;
    userName: string;
    password: string;
    token: string;
    refreshToken: string;
    refreshTokenExpiryTime: Date;
    roleId: number;
    roleName: string;
    employeeId? : number;

    createdBy: number;
    createdDate: Date;
    lastModifiedBy: number;
    lastModifiedDate: Date;
}
