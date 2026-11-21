import { MovimentacaoService as Service } from "../Services/MovimentacaoServices.js";

export const Controller = {
    async list(req, res, next) {
        try {
            const movimentacoes = await Service.list(req.query);
            res.status(200).json(movimentacoes);
        } catch (error) {
            next(error);
        }
    },

    async create(req, res, next) {
        try {
            const movimentacao = await Service.create(req.body);
            res.status(201).json(movimentacao);
        } catch (error) {
            next(error);
        }
    }
};
