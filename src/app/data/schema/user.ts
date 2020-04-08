export class User {
    id?: number;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    username: string;
    createDate: Date;
    status: number;
    roles: any[];
}