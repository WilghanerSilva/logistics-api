import {TransportadoraBD} from "../Models/TransportadoraModels.js";

// chamando as funções
export const Service = {

    async list(){
        return await TransportadoraBD.findAll();
    },

    async listDataById(id){
        return await TransportadoraBD.findByPk(id);
    },

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