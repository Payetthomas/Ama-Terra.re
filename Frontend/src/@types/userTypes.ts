export type TUser = {
    id: number,
    firstname: string,
    lastname: string,
    email: string,
    role: string | "user";
};

export type TDecodedUser = {
    id: number,
    firstname: string,
    email: string,
    role: string | string[];
}