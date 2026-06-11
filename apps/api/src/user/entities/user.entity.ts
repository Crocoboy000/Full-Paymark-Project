export class User {
    id: string;
    email: string;
    passwordHash: string;
    refreshTokenHash: string;
    lastActiveAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
