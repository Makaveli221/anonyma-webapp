import { Appreciation } from '@schema/appreciation';

export class Message {
    id?: string;
    type: string;
    email: string;
    texte: string;
    response?: string;
    validate?: boolean;
    published?: boolean;
    appreciations?: Appreciation[];
    createDate?: Date;
}