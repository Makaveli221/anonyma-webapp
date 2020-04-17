import { Appreciation } from '@schema/appreciation';
import { User } from '@schema/user';
import { Subject } from '@schema/subject';

export class Topic {
    id?: string;
    title: string;
    description: string;
    keywords?: string[];
    subject: string | Subject;
    imgDefault?: string;
    status: string;
    data: string;
    key?: string;
    appreciations?: Appreciation[];
    createUser?: User;
    createDate?: Date;
}