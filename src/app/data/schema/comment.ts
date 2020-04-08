import { Appreciation } from '@schema/appreciation';
import { Topic } from '@schema/topic';
import { User } from '@schema/user';

export class Comment {
    id?: number;
    topic?: Topic | string;
    parent?: Comment | string;
    message: string;
    appreciations?: Appreciation[];
    createUser?: User;
    createDate?: Date;
}