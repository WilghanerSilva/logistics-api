import {TransportadoraBD} from "../Models/TransportadoraModels.js";


// funções para o Controllers
export const Service = {

    // função que lista o banco de dados
    async list(){
        return await TransportadoraBD.findAll();
    },

    async listDataById(id){
        return await TransportadoraBD.findByPk(id);
    },

    // função que cria o usuario
    async create(data){
        return await TransportadoraBD.create(data);
    },

    async update(id, data){
        return await TransportadoraBD.update(data, { where: { id: id } });
    },

    async delete(id){
        return await TransportadoraBD.destroy({ where: { id: id } });
    }

};