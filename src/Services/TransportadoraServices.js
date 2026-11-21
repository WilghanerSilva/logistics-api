import { Op } from 'sequelize';
import { Transportadora, Encomenda } from '../Models/index.js';

export const TransportadoraService = {

  async list({ nome } = {}) {
    const where = {};
    if (nome) where.nome = { [Op.like]: `%${nome}%` };
    return await Transportadora.findAll({ where });
  },

  async listDataById(id) {
    return await Transportadora.findByPk(id);
  },

  async listEncomendas(id) {
    return await Transportadora.findByPk(id, { include: Encomenda, order: [[Encomenda, 'id', 'ASC']] });
  },

  async create(data) {
    return await Transportadora.create(data);
  },

  async update(id, data) {
    return await Transportadora.update(data, { where: { id: id } });
  },

  async delete(id) {
    return await Transportadora.destroy({ where: { id: id } });
  }

};
