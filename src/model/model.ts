/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-this-alias */
/* eslint-disable indent */
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema;

export interface User{
    email: string,
    password: string,
    isValidPassword: (password: string) => Promise<boolean>
}

const UserSchema = new Schema<User>({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre<User>(
    'save',
    async function(next) {
        const hash = await bcrypt.hash(this.password, 10);

        this.password = hash;
        next();
    },
);

UserSchema.methods.isValidPassword = async function (password: string) {
    const user = this as User;
    const compare: boolean = await bcrypt.compare(password, user.password);

    return compare;
};

export const UserModel = mongoose.model('user',UserSchema);