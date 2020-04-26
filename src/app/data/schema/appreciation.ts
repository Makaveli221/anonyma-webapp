import { User } from '@schema/user';

export class Appreciation {
    id?: string;
    liked: boolean;
    user?: User;
    createDate?: Date;
}