import { User } from '@schema/user';
import { TypeSubject } from '@schema/type-subject';

export class Subject {
    id?: number;
    title: string;
    description: string;
    keywords?: string[];
    typeSubject: string | TypeSubject;
    imgDefault?: string;
    data: any[];
    status: string;
    key?: string;
    createUser?: User;
    createDate?: Date;
}