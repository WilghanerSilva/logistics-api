import { Op } from 'sequelize';
import { Encomenda, Transportadora, Movimentacao } from '../Models/index.js';

const ordemHistorico = [[Movimentacao, 'createdAt', 'ASC'], [Movimentacao, 'id', 'ASC']];

export const EncomendaService = {

  async list({ transportadoraID, codigoRastreio, origem, destino, include } = {}) {
    const where = {};
    if (transportadoraID) where.transportadoraID = transportadoraID;
    if (codigoRastreio) where.codigoRastreio = codigoRastreio;
    if (origem) where.origem = { [Op.like]: `%${origem}%` };
    if (destino) where.destino = { [Op.like]: `%${destino}%` };

    const comHistorico = include === 'movimentacoes';
    return await Encomenda.findAll({
      where,
      include: comHistorico ? Movimentacao : [],
      order: [['id', 'ASC'], ...(comHistorico ? ordemHistorico : [])],
    });
  },

  async listDataById(id) {
    return await Encomenda.findByPk(id, { include: [Transportadora, Movimentacao], order: ordemHistorico });
  },

  async findByCodigoRastreio(codigoRastreio) {
    return await Encomenda.findOne({
      where: { codigoRastreio },
      include: [Transportadora, Movimentacao],
      order: ordemHistorico,
    });
  },

  async create(data) {
    return await Encomenda.create(data);
  },

  async update(id, data) {
    return await Encomenda.update(data, { where: { id: id } });
  },

  async delete(id) {
    return await Encomenda.destroy({ where: { id: id } });
  }

};
