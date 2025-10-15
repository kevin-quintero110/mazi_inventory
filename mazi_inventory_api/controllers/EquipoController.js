import { getAllEquipos, createEquipo } from '../models/EquipoModel.js';

export const listarEquipos = async (req, res) => {
  try {
    const equipos = await getAllEquipos();
    res.json(equipos);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const registrarEquipo = async (req, res) => {
  try {
    const nuevoEquipo = await createEquipo(req.body);
    res.status(201).json(nuevoEquipo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};