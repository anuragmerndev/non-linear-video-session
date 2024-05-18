import { UserModel } from '@models/user.model';

const newUser = async (data: { email: string; password: string }) => {
    return await UserModel.create(data);
};

const getUser = async (email: string) => {
    return await UserModel.findOne({ email });
};

export { getUser, newUser };
