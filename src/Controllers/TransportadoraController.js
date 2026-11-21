import { TransportadoraService as Service } from "../Services/TransportadoraServices.js";

// executando as funções
export const Controller = {
    async list(req, res, next) {
        try {
            const transportadoras = await Service.list(req.query);
            res.status(200).json(transportadoras);
        } catch (error) {
            next(error); 
        }
    },

    async listDataById(req, res, next) {
        try {
            const transportadora = await Service.listDataById(req.params.id);
            
            // Verifica se o registro realmente existe
            if (!transportadora) {
                return res.status(404).json({ error: 'Transportadora não encontrada.' });
            }

            res.status(200).json(transportadora);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const dadosTransportadora = req.body;
            const transportadora = await Service.create(dadosTransportadora);
            res.status(201).json(transportadora);
        } catch (error) {
            next(error);
        }
    },

    async update(req, res, next) {
        try {
            const transportadora = await Service.update(req.params.id, req.body);
            res.status(200).json(transportadora);
        } catch (error) {
            next(error);
        }
    },

    async delete(req, res, next) {
        try {
            const transportadora = await Service.delete(req.params.id);
            res.status(200).json(transportadora);
        } catch (error) {
            next(error);
        }
    }
};