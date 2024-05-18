import { Schema, model } from 'mongoose';

const userSchema = new Schema(
    {
        email: {
            type: String,
            require: true,
        },
        password: {
            type: String,
            require: true,
        },
    },
    { timestamps: true },
);

const UserModel = model('user', userSchema);

export { UserModel };
