import { User } from '@schema/user';

export class Appreciation {
    id?: number;
    liked: boolean;
    createUser?: User;
    createDate?: Date;
}