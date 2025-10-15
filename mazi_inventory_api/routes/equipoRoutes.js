import express from 'express';
import { listarEquipos, registrarEquipo } from '../controllers/EquipoController.js';

const router = express.Router();

router.get('/', listarEquipos);
router.post('/', registrarEquipo);

export default router;