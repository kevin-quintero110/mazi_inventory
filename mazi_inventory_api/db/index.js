import pg from 'pg';
import dotenv from 'dotenv';
import fs from 'fs';
import path from 'path';

dotenv.config();

const { Client } = pg;

function getEnvDatabaseUrl() {
  if (process.env.DATABASE_URL) return process.env.DATABASE_URL;

  // intenta detectar una URL sin clave= en el .env (línea sola que empiece por postgres://)
  try {
    const envPath = path.resolve(process.cwd(), '.env');
    if (fs.existsSync(envPath)) {
      const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/).map(l => l.trim());
      for (const line of lines) {
        if (!line) continue;
        // omite líneas KEY=VALUE y comentarios
        if (/^[A-Za-z0-9_]+=/.test(line)) continue;
        if (/^postgres(ql)?:\/\//i.test(line)) return line;
      }
    }
  } catch (e) {
    // no bloquear en caso de error leyendo .env
  }
  return null;
}

function buildConnectionString() {
  const maybeUrl = getEnvDatabaseUrl() || process.env.DATABASE_URL;
  if (maybeUrl) return maybeUrl;

  const { DATABASE_USER, DATABASE_PASSWORD, DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;
  if (DATABASE_USER && DATABASE_PASSWORD && DATABASE_HOST && DATABASE_NAME) {
    const user = encodeURIComponent(DATABASE_USER);
    const pass = encodeURIComponent(DATABASE_PASSWORD);
    const host = DATABASE_HOST;
    const port = DATABASE_PORT || '5432';
    const name = DATABASE_NAME;
    return `postgresql://${user}:${pass}@${host}:${port}/${name}`;
  }

  throw new Error('No se encontró configuración de conexión: define DATABASE_URL o DATABASE_USER/DATABASE_PASSWORD/DATABASE_HOST/DATABASE_NAME en .env');
}

const connectionString = buildConnectionString();

const client = new Client({
  connectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

client.connect()
  .then(() => console.log('✅ Conectado correctamente a la base de datos Supabase'))
  .catch(err => {
    console.error('❌ Error de conexión:', err.message || err);
    process.exitCode = 1;
  });

export default client;
