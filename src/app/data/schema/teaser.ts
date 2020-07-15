import { TypeSubject } from '@schema/type-subject';
import { User } from '@schema/user';

export class Teaser {
    id?: string;
    title: string;
    description: string;
    keywords?: string[];
    typeSubject: TypeSubject;
    presentation?: string;
    createUser?: User;
    createDate?: Date;
}