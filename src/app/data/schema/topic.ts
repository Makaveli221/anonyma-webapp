import { Appreciation } from '@schema/appreciation';
import { User } from '@schema/user';
import { Subject } from '@schema/subject';

export class Topic {
    id?: string;
    title: string;
    description: string;
    keywords?: string[];
    subject: Subject | string;
    imgDefault?: string;
    status: string;
    data: string;
    key?: string;
    appreciations?: Appreciation[];
    commentTotal?: number;
    createUser?: User;
    createDate?: Date;
}