import {EncomendaBD} from "../Models/EncomendaModels.js";


// funções para o Controllers
export const Service = {

    // função que lista o banco de dados
    async list(){
        return await EncomendaBD.findAll();
    },

    async listDataById(id){
        return await EncomendaBD.findByPk(id);
    },

    // função que cria o usuario
    async create(data){
        return await EncomendaBD.create(data);
    },

    async update(id, data){
        return await EncomendaBD.update(data, { where: { id: id } });
    },

    async delete(id){
        return await EncomendaBD.destroy({ where: { id: id } });
    }

};