export interface Register {
    username: string;
    email: string;
    password: string;
}

export interface Login {
    username: string;
    password: string;
}

export interface User {
    id: string;
    username: string;
    email: string;
    token?: string;
}
