import {UserService} from "../Services/UserServices.js";

// fazendo o meio campo entre o service e a rota
export const UserController = {
    async ListUsers(req, res){
        try {
            const users = await UserService.ListUsers();
            res.status(200).json(users);
        } catch (error) {
            console.error(error);
        }
    },
    async CreateUser(req, res){
        try {
            const user = await UserService.CreateUser(req.body);
            res.status(201).json(user);
        } catch (error) {
            console.error(error);
        }
    }

};