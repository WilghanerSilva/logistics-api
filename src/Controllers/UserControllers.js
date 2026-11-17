import {UserService} from "../Services/UserServices.js";

// listando o usario
export const UserController = {
    async ListUsers(req, res){
        try {
            const users = await UserService.ListUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
        }
    },

    // criando o usuario
    async CreateUser(req, res){
        try {
            const user = await UserService.CreateUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
        }
    }

};