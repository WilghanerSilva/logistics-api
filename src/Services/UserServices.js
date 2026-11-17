import {User} from "../Models/UserModels.js";


// funções para o Controllers
export const UserService = {

    // função que lista o banco de dados
    async ListUsers(){
        return await User.findAll();
    },

    // função que cria o usuario
    async CreateUser(dataUser){
        return await User.create(dataUser);
    }

};