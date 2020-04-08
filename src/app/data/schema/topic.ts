import { Appreciation } from '@schema/appreciation';
import { User } from '@schema/user';
import { Subject } from '@schema/subject';

export class Topic {
    id?: number;
    title: string;
    description: string;
    keywords?: string[];
    subject: string | Subject;
    status: string;
    key?: string;
    appreciations?: Appreciation[];
    createUser?: User;
    createDate?: Date;
}