import { Movimentacao } from '../Models/index.js';

export const MovimentacaoService = {

  async list({ encomendaID, status } = {}) {
    const where = {};
    if (encomendaID) where.encomendaID = encomendaID;
    if (status) where.status = status;
    return await Movimentacao.findAll({ where, order: [['createdAt', 'ASC'], ['id', 'ASC']] });
  },

  async create(data) {
    return await Movimentacao.create(data);
  }

};
