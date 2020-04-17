import { User } from '@schema/user';

export class Appreciation {
    id?: string;
    liked: boolean;
    createUser?: User;
    createDate?: Date;
}