export enum Role {
    USER = "USER",
    ADMIN = "ADMIN",
}
export interface Iuser {
    _id: string;
    username: string;
    name: string | null;
    role: Role;
    link: string | null;
}

export type CommonApiResponse<T=unknown> = {
    success: boolean;
    message: string;
    data: T;
}

export interface Ialert {
    show: boolean;
    msg: string;
    type: 'success' | 'error';
}