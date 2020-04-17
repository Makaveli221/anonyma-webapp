export class User {
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    username: string;
    password?: string;
    createDate: Date;
    status: number;
    roles: any[];
}