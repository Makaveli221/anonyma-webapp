import { User } from '@schema/user';
import { TypeSubject } from '@schema/type-subject';

export class Subject {
    id?: string;
    title: string;
    description: string;
    keywords?: string[];
    typeSubject: string | TypeSubject;
    data: any[];
    status: string;
    key?: string;
    createUser?: User;
    createDate?: Date;
}