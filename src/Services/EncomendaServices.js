import {EncomendaBD} from "../Models/EncomendaModels.js";


// gerenciando as funções
export const Service = {
    async list(){
        return await EncomendaBD.findAll();
    },
    async listDataById(id){
        return await EncomendaBD.findByPk(id);
    },
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