import userModel from "../models/users.js";

export default class UserManager {
    getUsers = async () => {
        return userModel.find().lean();
    };

    getUsersBy = (params) => {
        return userModel.findOne(params).lean();
    };

    createUsers = (user) => {
        //compruebo si existe el email
        return userModel.create(user);
    };

    updateUsers = (id, user) => {
        return userModel.findByIdAndUpdate(id, user);
    };

    deleteUsers = (id) => {
        return userModel.findByIdAndDelete(id);
    };
}