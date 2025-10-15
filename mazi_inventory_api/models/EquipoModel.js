import sql from '../db/index.js'


export const getAllEquipos = async () => {
  return await sql`SELECT * FROM mazi_inventory_equipos`;
};

export const createEquipo = async (equipo) => {
  const { codigo_interno, nombre, tipo, marca, modelo, serial, fecha_compra, valor, estado, id_ubicacion, id_usuario, ultima_revision, proxima_revision } = equipo;
  return await sql`
    INSERT INTO mazi_inventory_equipos (
      codigo_interno, nombre, tipo, marca, modelo, serial, fecha_compra, valor, estado, id_ubicacion, id_usuario, ultima_revision, proxima_revision
    ) VALUES (
      ${codigo_interno}, ${nombre}, ${tipo}, ${marca}, ${modelo}, ${serial}, ${fecha_compra}, ${valor}, ${estado}, ${id_ubicacion}, ${id_usuario}, ${ultima_revision}, ${proxima_revision}
    ) RETURNING *`;
};