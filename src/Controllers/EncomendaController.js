import { Service } from "../Services/EncomendaServices.js";

export const Controller = {
    // Adicionado o parâmetro 'next' para enviar erros ao middleware do App
    async list(req, res, next) {
        try {
            const encomenda = await Service.list();
            res.status(200).json(encomenda);
        } catch (error) {
            next(error); 
        }
    },

    async listDataById(req, res, next) {
        try {
            const encomenda = await Service.listDataById(req.params.id);
            
            // Verifica se o registro realmente existe
            if (!encomenda) {
                return res.status(404).json({ error: 'encomenda não encontrada.' });
            }

            res.status(200).json(encomenda);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const dadosencomenda = req.body;
            const encomenda = await Service.create(dadosencomenda);
            res.status(201).json(encomenda);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const encomenda = await Service.update(req.params.id, req.body);
            res.status(200).json(encomenda);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const encomenda = await Service.delete(req.params.id);
            res.status(200).json(encomenda);
        } catch (error) {
            next(error);
        }
    }
};